// Import Dependencies
import PropTypes from "prop-types";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import Quill from "quill";

// Import Quill styles as text
import quillCSS from "quill/dist/quill.snow.css?inline";

// ----------------------------------------------------------------------

const DEFAULT_PLACEHOLDER = "Type here...";

// Inject styles into head
const injectQuillStyles = () => {
  if (!document.getElementById("quill-styles")) {
    const style = document.createElement("style");
    style.id = "quill-styles";
    style.innerText = quillCSS;
    document.head.appendChild(style);
  }
};

const TextEditor = forwardRef(
  (
    {
      readOnly = false,
      value,
      defaultValue,
      onTextChange,
      onSelectionChange,
      onChange,
      placeholder,
      modules,
      className,
      error,
      classNames = {},
      label,
      height = "100px", // Default height
    },
    forwardedRef
  ) => {
    const containerRef = useRef(null);
    const quillRef = useRef(null);

    // Get Delta class from Quill
    const Delta = Quill.import("delta");

    // Initialize internalValue state properly
    const [internalValue] = useState(() => defaultValue || new Delta());

    // Keep refs for event handlers
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const onChangeRef = useRef(onChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
      onChangeRef.current = onChange;
    }, [onTextChange, onSelectionChange, onChange]);

    // Inject styles once
    useEffect(() => {
      injectQuillStyles();
    }, []);

    // Initialize Quill
    useEffect(() => {
      const container = containerRef.current;

      const editorDiv = document.createElement("div");
      container.appendChild(editorDiv);

      const quill = new Quill(editorDiv, {
        theme: "snow",
        placeholder: placeholder || DEFAULT_PLACEHOLDER,
        modules: modules || {},
      });

      quill.enable(!readOnly);
      quill.setContents(value || internalValue);

      quillRef.current = quill;

      // Handle text change
      quill.on(Quill.events.TEXT_CHANGE, (delta, oldDelta, source) => {
        if (source === "user") {
          const newContent = quill.getContents();
          onChangeRef.current?.(newContent, quill);
          onTextChangeRef.current?.(delta, oldDelta, source);
        }
      });

      // Handle selection change
      quill.on(Quill.events.SELECTION_CHANGE, (range, oldRange, source) => {
        onSelectionChangeRef.current?.(range, oldRange, source);
      });

      return () => {
        quill.off(Quill.events.TEXT_CHANGE);
        quill.off(Quill.events.SELECTION_CHANGE);
        quillRef.current = null;
        container.innerHTML = "";
      };
    }, [readOnly, modules, placeholder]);

    // Sync with value prop safely
    useEffect(() => {
      if (quillRef.current && value !== undefined) {
        const current = quillRef.current.getContents();
        const deltaValue = new Delta(value);
        const diff = current.diff(deltaValue);
        if (diff.ops.length > 0) {
          quillRef.current.setContents(deltaValue);
        }
      }
    }, [value]);

    // Expose methods via ref
    useImperativeHandle(forwardedRef, () => ({
      getQuillInstance: () => quillRef.current,
      focus: () => quillRef.current.focus(),
      blur: () => quillRef.current.blur(),
      hasFocus: () => quillRef.current.hasFocus(),
    }));

    return (
      <div
        className={clsx(
          "flex flex-col",
          className,
          error && "editor-error",
          classNames.root
        )}
      >
        {label && (
          <label className={clsx("text-lg font-semibold", classNames.label)}>
            {label}
          </label>
        )}
        <div
          className={clsx(
            "editor-container",
            label && "mt-2",
            classNames.container
          )}
          ref={containerRef}
          style={{ height }}
        />
        {error && typeof error !== "boolean" && (
          <div className={clsx("text-red-500 text-sm mt-1", classNames.error)}>
            {error}
          </div>
        )}
      </div>
    );
  }
);

TextEditor.displayName = "TextEditor";

TextEditor.propTypes = {
  readOnly: PropTypes.bool,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  onTextChange: PropTypes.func,
  onSelectionChange: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  modules: PropTypes.object,
  className: PropTypes.string,
  classNames: PropTypes.shape({
    root: PropTypes.string,
    container: PropTypes.string,
    error: PropTypes.string,
    label: PropTypes.string,
  }),
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  label: PropTypes.node,
  height: PropTypes.string, // Added prop for height
};

export { TextEditor };
