"use client";
import React from "react";
import { useField, useFormikContext } from "formik";
import PhoneInput, { Value, parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
// import metadata from "libphonenumber-js/metadata.min.json";
 
const countryNames: Record<string, string> = {
  AF: "Afghanistan",
  AL: "Albania",
  DZ: "Algeria",
  AD: "Andorra",
  AO: "Angola",
  AR: "Argentina",
  AM: "Armenia",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BH: "Bahrain",
  BD: "Bangladesh",
  BY: "Belarus",
  BE: "Belgium",
  BJ: "Benin",
  BT: "Bhutan",
  BO: "Bolivia",
  BA: "Bosnia and Herzegovina",
  BW: "Botswana",
  BR: "Brazil",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CV: "Cape Verde",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CO: "Colombia",
  KM: "Comoros",
  CG: "Congo",
  CR: "Costa Rica",
  CI: "Côte d’Ivoire",
  HR: "Croatia",
  CU: "Cuba",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  EE: "Estonia",
  ET: "Ethiopia",
  FI: "Finland",
  FR: "France",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GR: "Greece",
  GD: "Grenada",
  GT: "Guatemala",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran",
  IQ: "Iraq",
  IE: "Ireland",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KR: "Korea (South)",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao People’s Democratic Republic",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libya",
  LT: "Lithuania",
  LU: "Luxembourg",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MR: "Mauritania",
  MU: "Mauritius",
  MX: "Mexico",
  MD: "Moldova",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NP: "Nepal",
  NL: "Netherlands",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PS: "Palestine",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PL: "Poland",
  PT: "Portugal",
  QA: "Qatar",
  RO: "Romania",
  RU: "Russian Federation",
  RW: "Rwanda",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SK: "Slovakia",
  SI: "Slovenia",
  ZA: "South Africa",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syrian Arab Republic",
  TW: "Taiwan",
  TZ: "Tanzania",
  TH: "Thailand",
  TG: "Togo",
  TO: "Tonga",
  TT: "Trinidad and Tobago",
  TN: "Tunisia",
  TR: "Türkiye",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VE: "Venezuela",
  VN: "Vietnam",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};

interface FormikPhoneInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  countryField?: string; // 👈 optional Formik field name to store country full name
}

const FormikPhoneInput: React.FC<FormikPhoneInputProps> = ({
  name,
  label,
  placeholder = "Enter phone number",
  disabled, 
}) => {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (value: Value) => {
    helpers.setValue(value || "");

    if (value) {
      try {
        const phoneNumber = parsePhoneNumber(value);
        if (phoneNumber?.country && countryNames[phoneNumber.country]) {
          console.log(countryNames[phoneNumber.country]);
          
          setFieldValue("country", countryNames[phoneNumber.country]);
        }
      } catch (err) {
        console.warn("Could not parse phone number:", err);
      }
    }
    setFieldValue(name, value);
  };

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="text-[12px] font-medium text-gray-700">
          {label}
        </label>
      )}

      <PhoneInput
        id={name}
        defaultCountry="NG"
        value={field.value as Value}
        onChange={handleChange}
        onBlur={() => helpers.setTouched(true)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full border rounded-lg px-3 h-[45px] text-[14px]
          ${meta.touched && meta.error ? "border-red-500" : "border-gray-300"}
        `}
      />

      {meta.touched && meta.error && (
        <p className="text-[12px] text-red-500">{meta.error}</p>
      )}
    </div>
  );
};

export default FormikPhoneInput;
