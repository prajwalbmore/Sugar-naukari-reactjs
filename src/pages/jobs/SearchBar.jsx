import React, { useState, useMemo } from "react";
import { Input, Select, MenuItem } from "@mui/material";
import { MapPin, Search } from "lucide-react";
import Button from "../../components/ui/Button";
import { useTranslation } from "react-i18next";

const SearchBar = ({ onSearch, jobData }) => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const { t } = useTranslation();
  // Get unique locations from jobData
  const uniqueLocations = useMemo(() => {
    if (!jobData) return [];
    const locations = jobData.map((job) => job.location);
    return [...new Set(locations)];
  }, [jobData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ keyword, location });
  };

  return (
    <section className="px-4 sm:px-8 md:px-4 lg:px-24 py-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  sm:flex-row w-full rounded-3xl lg:rounded-full shadow-lg bg-white px-4 sm:px-6 md:px-4 py-2 items-center gap-4"
      >
        {/* Input */}
        <div className="flex items-center w-full sm:w-1/2 gap-3">
          <Search size={24} />
          <Input
            placeholder={t("Job title or company name")}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            fullWidth
            sx={{
              color: "gray.700",
              fontSize: "1rem",
              "& input::placeholder": { color: "gray.800" },
              paddingY: "0.20rem",
            }}
          />
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-10 bg-gray-300"></div>

        {/* Select */}
        <div className="flex items-center w-full sm:w-1/2 gap-3">
          <MapPin size={24} />
          <Select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            displayEmpty
            variant="standard"
            fullWidth
            sx={{
              color: "gray.400",
              fontSize: "1rem",
              paddingY: "0.20rem",
            }}
          >
            <MenuItem value="" disabled>
              {t("Select City")}
            </MenuItem>
            <MenuItem value="all">All</MenuItem>
            {uniqueLocations.map((loc) => (
              <MenuItem key={loc} value={loc}>
                {loc}
              </MenuItem>
            ))}
          </Select>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="flex items-center bg-black text-white text-base sm:text-lg md:text-xl font-bold px-4 sm:px-6 md:px-6 py-2 rounded-full hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center"
        >
          {t("Search")}
        </Button>
      </form>
    </section>
  );
};

export default SearchBar;
// import React, { useState, useMemo } from "react";
// import { Input, Select, MenuItem } from "@mui/material";
// import { MapPin, Search } from "lucide-react";
// import Button from "../../components/ui/Button";

// const SearchBar = ({ onSearch, jobData }) => {
//   const [keyword, setKeyword] = useState("");
//   const [location, setLocation] = useState("");

//   // Get unique locations from jobData
//   const uniqueLocations = useMemo(() => {
//     if (!jobData) return [];
//     const locations = jobData.map((job) => job.location);
//     return [...new Set(locations)]; // remove duplicates
//   }, [jobData]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch({ keyword, location });
//   };

//   return (
//     <section className="px-24 py-2">
//       <form
//         onSubmit={handleSubmit}
//         className="flex w-full rounded-full shadow-lg bg-white px-10 py-2 items-center gap-4"
//       >
//         {/* Input - 50% width */}
//         <div className="flex items-center w-1/2 gap-3">
//           <Search size={30} />
//           <Input
//             placeholder="Job title or keyword"
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//             fullWidth
//             sx={{
//               color: "gray.700",
//               fontSize: "1.1rem",
//               "& input::placeholder": { color: "gray.800" },
//               paddingY: "0.20rem",
//             }}
//           />
//         </div>

//         {/* Divider */}
//         <div className="w-px h-14 bg-gray-300"></div>

//         {/* Select - 50% width */}
//         <div className="flex items-center w-1/2 gap-3">
//           <MapPin size={30} />
//           <Select
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             displayEmpty
//             variant="standard"
//             fullWidth
//             sx={{
//               color: "gray.400",
//               fontSize: "1.1rem",
//               paddingY: "0.20rem",
//             }}
//           >
//             <MenuItem value="" disabled>
//               Select City
//             </MenuItem>
//             {uniqueLocations.map((loc) => (
//               <MenuItem key={loc} value={loc}>
//                 {loc}
//               </MenuItem>
//             ))}
//           </Select>
//         </div>

//         {/* Submit Button */}
//         <Button
//           type="submit"
//           className="flex items-center bg-black text-white text-xl font-bold px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
//         >
//           Search
//         </Button>
//       </form>
//     </section>
//   );
// };

// export default SearchBar;
// import React, { useState } from "react";
// import { Input, Select, MenuItem } from "@mui/material";
// import { MapPin, Search } from "lucide-react";

// const SearchBar = ({ onSearch, jobData }) => {
//   const [keyword, setKeyword] = useState("");
//   const [location, setLocation] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch({ keyword, location });
//   };

//   return (
//     <section className="px-24 py-6 ">
//       <form
//         onSubmit={handleSubmit}
//         className="flex w-full rounded-full shadow-lg bg-white px-10 py-6 items-center gap-4"
//       >
//         {/* Input - 50% width, taller */}
//         <div className="flex items-center w-1/2 gap-3">
//           <Search size={30} />
//           <Input
//             placeholder="Job title or keyword"
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//             fullWidth
//             sx={{
//               color: "gray.700",
//               fontSize: "1.3rem",
//               "& input::placeholder": { color: "gray.800" },
//               paddingY: "0.50rem",
//             }}
//           />
//         </div>

//         {/* Divider */}
//         <div className="w-px h-14 bg-gray-300"></div>

//         {/* Select - 50% width, taller */}
//         <div className="flex items-center w-1/2 gap-3">
//           <MapPin size={30} />
//           <Select
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             displayEmpty
//             variant="standard"
//             fullWidth
//             sx={{
//               color: "gray.400",
//               fontSize: "1.3rem",
//               paddingY: "0.50rem",
//             }}
//           >
//             <MenuItem value="" disabled>
//               Select City
//             </MenuItem>
//             <MenuItem value="Paris, France">Paris, France</MenuItem>
//             <MenuItem value="London, UK">London, UK</MenuItem>
//             <MenuItem value="Berlin, Germany">Berlin, Germany</MenuItem>
//             <MenuItem value="Milan, Italy">Milan, Italy</MenuItem>
//           </Select>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="flex items-center bg-black text-white text-xl font-bold px-10 py-4 rounded-full hover:bg-gray-800 transition-colors"
//         >
//           Search
//         </button>
//       </form>
//     </section>
//   );
// };

// export default SearchBar;
