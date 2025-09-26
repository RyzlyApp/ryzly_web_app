import React, { useState } from "react";

interface SkillsModalProps {
  onClose: () => void;
  onSave: (skills: string[]) => void;
  initialSkills: string[];
}

const SkillsModal: React.FC<SkillsModalProps> = ({
  onClose,
  onSave,
  initialSkills,
}) => {
  const [skillsInput, setSkillsInput] = useState(initialSkills.join(", "));
  const [skills, setSkills] = useState<string[]>(initialSkills);

  const parseSkills = (input: string): string[] => {
    return input
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setSkillsInput(value);
    setSkills(parseSkills(value));
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
    setSkillsInput(newSkills.join(", "));
  };

  const handleSave = () => {
    onSave(skills);
    onClose();
  };

  return (
    <div className="pt-10 lg:pt-0">
      <p className="text-xs text-gray-600 mb-4">
        Add or remove skills separated by commas
      </p>

      <div className="mb-6">
        <textarea
          value={skillsInput}
          onChange={handleInputChange}
          placeholder="Enter skills separated by commas (e.g., Design, Development, Marketing)"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm h-24 resize-none"
        />
      </div>

      <div className="mb-6">
        <p className="text-xs font-semibold mb-2">Preview:</p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center bg-[#E9EAEB] rounded-full px-3 py-1"
            >
              <span className="text-xs">{skill}</span>
              <button
                onClick={() => handleRemoveSkill(index)}
                className="ml-2 text-gray-500 hover:text-red-500"
                aria-label={`Remove ${skill}`}
              >
                &times;
              </button>
            </div>
          ))}
          {skills.length === 0 && (
            <p className="text-xs text-gray-500">No skills added yet</p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="px-4 py-2 w-full cursor-pointer bg-[#5160E7] text-white rounded-full hover:bg-[#4451c9]"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SkillsModal;
