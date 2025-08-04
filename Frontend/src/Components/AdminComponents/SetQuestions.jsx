
const SetQuestions = ({ newQuestion, skills, addQuestion, setNewQuestion, errors }) => {
  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-6">Manage Questions</h2>
      <div className="p-6 rounded mb-6">
        <select
          value={newQuestion.skill}
          onChange={(e) => setNewQuestion({ ...newQuestion, skill: e.target.value })}
          className="border p-2 rounded w-full mb-1 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          <option value="">Select Skill</option>
          {skills.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
        {errors.skill && <p className="text-red-500 text-sm mb-2">{errors.skill}</p>}

        <input
          type="text"
          value={newQuestion.question}
          onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
          placeholder="Enter question"
          className="border p-2 rounded w-full mb-1 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        {errors.question && <p className="text-red-500 text-sm mb-2">{errors.question}</p>}

        {newQuestion.options.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              value={option}
              onChange={(e) => {
                const updatedOptions = [...newQuestion.options];
                updatedOptions[index] = e.target.value;
                setNewQuestion({ ...newQuestion, options: updatedOptions });
              }}
              placeholder={`Option ${index + 1}`}
              className="border p-2 rounded w-full mb-1 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            {errors.options[index] && (
              <p className="text-red-500 text-sm mb-2">{errors.options[index]}</p>
            )}
          </div>
        ))}

        <select
          value={newQuestion.correctAnswer}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, correctAnswer: parseInt(e.target.value) })
          }
          className="border p-2 rounded w-full mb-1 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          {newQuestion.options.map((_, index) => (
            <option key={index} value={index}>
              Option {index + 1}
            </option>
          ))}
        </select>
        {errors.correctAnswer && <p className="text-red-500 text-sm mb-2">{errors.correctAnswer}</p>}

        <button
          onClick={addQuestion}
          className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
        >
          Add Question
        </button>
      </div>
    </div>
  );
};

// export default SetQuestions;




// const SetQuestions=({newQuestion,skills,addQuestion,setNewQuestion})=>{


//     return(

//  <div className="">
//             <h2 className="text-3xl font-bold mb-6">Manage Questions</h2>
//             <div className="  p-6 rounded  mb-6">
//               <select
//                 value={newQuestion.skill}
//                 onChange={(e) => setNewQuestion({ ...newQuestion, skill: e.target.value })}
//                 className="border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//               >
//                 <option value="">Select Skill</option>
//                 {skills.map((skill) => (
//                   <option key={skill} value={skill}>
//                     {skill}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 type="text"
//                 value={newQuestion.question}
//                 onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
//                 placeholder="Enter question"
//                 className="border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//               />
//               {newQuestion.options.map((option, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   value={option}
//                   onChange={(e) => {
//                     const updatedOptions = [...newQuestion.options];
//                     updatedOptions[index] = e.target.value;
//                     setNewQuestion({ ...newQuestion, options: updatedOptions });
//                   }}
//                   placeholder={`Option ${index + 1}`}
//                   className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//                 />
//               ))}
//               <select
//                 value={newQuestion.correctAnswer}
//                 onChange={(e) =>
//                   setNewQuestion({ ...newQuestion, correctAnswer: parseInt(e.target.value) })
//                 }
//                 className="border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//               >
//                 {newQuestion.options.map((_, index) => (
//                   <option key={index} value={index}>
//                     Option {index + 1}
//                   </option>
//                 ))}
//               </select>
//               <button
//                 onClick={addQuestion}
//                 className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
//               >
//                 Add Question
//               </button>
//             </div>
            
//           </div>


//     )
// }

export default SetQuestions;


