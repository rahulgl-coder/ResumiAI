// ManageSkills.jsx
import React from 'react';

const ManageSkills = ({ skills, newSkill, setNewSkill, addSkill, deleteSkill }) => {
  return (
    <div className="fade-in">
      <h2 className="text-3xl font-bold mb-6">Manage Skills</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Enter new skill"
          className="border p-2 rounded flex-1 mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <button
          onClick={addSkill}
          className="bg-white-600 text-black font-bold rounded-8 p-2 rounded hover:bg-black hover:text-white transition"
        >
          Add Skill
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div
            key={skill}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition slide-in"
          >
            <span>{skill}</span>
            <button
              onClick={() => deleteSkill(skill)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSkills;
