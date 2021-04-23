import React, { Component } from "react";
import CreatableSelect from "react-select/creatable";

//TODO: Convert from JS to TSX

export default class SearchSelections extends Component {
  constructor(props) {
    super(props);
  }
  handleChange = (newValue) => {
    this.setState(() => {
      this.props.selections(newValue);
      return { selection: newValue };
    });

    console.groupEnd();
  };

  render() {
    return (
      <CreatableSelect
        formatCreateLabel={(inputValue) => `${inputValue}`}
        isMulti
        onChange={this.handleChange}
        className={this.props.style}
        placeholder={`ECO, CSC 1000, Art, Ceramics`}
        options={courseOptions}
      />
    );
  }
}

//we'll move this here for now, and probably async-ly get this from the db later.
const courseOptions = [
  { value: "ACC", label: "Accounting" },
  { value: "ABL", label: "Adventure Based Learning" },
  { value: "AAA", label: "African & African-Amer Studies" },
  { value: "ACT", label: "Acting" },
  { value: "AMS", label: "American Studies" },
  { value: "ANT", label: "Anthropology" },
  { value: "ARB", label: "Arabic" },
  { value: "ART", label: "Art" },
  { value: "ARH", label: "Art History" },
  { value: "AAD", label: "Arts Administration" },
  { value: "APS", label: "Asian/Pacific Stud" },
  { value: "BIO", label: "Biology" },
  { value: "BIOL", label: "Biology Lab" },
  { value: "BUS", label: "Business Administration" },
  { value: "CAS", label: "College of Arts and Sciences" },
  { value: "CAE", label: "Career Exploration & Education" },
  { value: "CHM", label: "Chemistry" },
  { value: "CHML", label: "Chemistry Lab" },
  { value: "CHMR", label: "Chemistry Recitations" },
  { value: "CHN", label: "Chinese" },
  { value: "CTA", label: "Cinema and Television Arts" },
  { value: "CES", label: "Civic Engagement Scholars" },
  { value: "CLA", label: "Classical Studies" },
  { value: "COM", label: "Communications" },
  { value: "CDE", label: "Communication Design" },
  { value: "COR", label: "Elon Core Curriculum" },
  { value: "CIS", label: "Computer Information Systems" },
  { value: "CSC", label: "Computer Science" },
  { value: "COE", label: "Cooperative Education" },
  { value: "CJS", label: "Criminal Justice Studies" },
  { value: "DAN", label: "Dance" },
  { value: "DTS", label: "Drama and Theatre Studies" },
  { value: "ECO", label: "Economics" },
  { value: "EDU", label: "Education" },
  { value: "ECF", label: "Elon College Fellows" },
  { value: "EGR", label: "Engineering" },
  { value: "EGRL", label: "Engineering Lab" },
  { value: "ELN", label: "Elon" },
  { value: "ENG", label: "English" },
  { value: "ENT", label: "Entrepreneurship" },
  { value: "ENS", label: "Environmental Studies" },
  { value: "ENSL", label: "Env. Studies Lab" },
  { value: "ESS", label: "Exercise Science" },
  { value: "ESSL", label: "Exercise Science Lab" },
  { value: "EXP", label: "Expression" },
  { value: "FIN", label: "Finance" },
  { value: "FRE", label: "French" },
  { value: "GAM", label: "Game Design" },
  { value: "GBL", label: "Global Education Center Course" },
  { value: "GEO", label: "Geography" },
  { value: "GIS", label: "Geographic Info Systems" },
  { value: "GER", label: "German" },
  { value: "GRK", label: "Greek" },
  { value: "HEB", label: "Hebrew" },
  { value: "HED", label: "Health Education" },
  { value: "HST", label: "History" },
  { value: "HNR", label: "Honors" },
  { value: "HSS", label: "Human Service Studies" },
  { value: "IDS", label: "Interdisciplinary Studies" },
  { value: "INB", label: "International Business" },
  { value: "IGS", label: "International/Global Studies" },
  { value: "IME", label: "Interactive Media" },
  { value: "ISC", label: "Information Science" },
  { value: "ITL", label: "Italian" },
  { value: "IRS", label: "Interreligious Studies" },
  { value: "JOU", label: "Journalism" },
  { value: "JST", label: "Jewish Studies" },
  { value: "LAT", label: "Latin" },
  { value: "LAS", label: "Latin American Studies" },
  { value: "LAW", label: "Law" },
  { value: "LED", label: "Leadership Studies" },
  { value: "LSB", label: "Love School of Bus." },
  { value: "MEA", label: "Media Analytics" },
  { value: "MGT", label: "Management" },
  { value: "MKT", label: "Marketing" },
  { value: "MBA", label: "Master of Business Admin" },
  { value: "MED", label: "Master of Education" },
  { value: "MHE", label: "M.A.Higher Education" },
  { value: "MSCM", label: "Master of Science Management" },
  { value: "MTH", label: "Mathematics" },
  { value: "MSC", label: "Military Science" },
  { value: "MMA", label: "Multimedia Authoring" },
  { value: "MUS", label: "Music" },
  { value: "MTE", label: "Music Theatre" },
  { value: "NEU", label: "Neuroscience" },
  { value: "PCS", label: "Peace and Conflict Studies" },
  { value: "PER", label: "Periclean Scholars" },
  { value: "PHL", label: "Philosophy" },
  { value: "PPE", label: "Philosophy, Politics and Econ" },
  { value: "PED", label: "Physical Education" },
  { value: "PEDL", label: "Physical Education Lab" },
  { value: "PEH", label: "Physical Education & Health" },
  { value: "PEHL", label: "Phys. Edu & Health Lab" },
  { value: "PHY", label: "Physics" },
  { value: "PHYL", label: "Physics Lab" },
  { value: "PST", label: "Policy Studies" },
  { value: "POL", label: "Political Science" },
  { value: "PSJ", label: "Poverty and Social Justice" },
  { value: "PSY", label: "Psychology" },
  { value: "PHS", label: "Public Health Studies" },
  { value: "PWR", label: "Professional Writing/Rhetoric" },
  { value: "REL", label: "Religious Studies" },
  { value: "SCI", label: "Science" },
  { value: "SOC", label: "Sociology" },
  { value: "SPN", label: "Spanish" },
  { value: "SPT", label: "Sport Management" },
  { value: "STC", label: "Strategic Communications" },
  { value: "STS", label: "Statistics" },
  { value: "STA", label: "Study Abroad" },
  { value: "TDT", label: "Theatrical Design/Technology" },
  { value: "STU", label: "Study USA" },
  { value: "THE", label: "Theatre Arts" },
  { value: "WGS", label: "Women's, Gender, Sexualities" },
  { value: "WHE", label: "Wellness and Health Education" },
  { value: "WLC", label: "World Languages and Cultures" },
];
