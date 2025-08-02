




const ViewQuestions=({questions})=>{


    return(

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="bg-white p-4 rounded shadow hover:shadow-lg transition slide-in"
                >
                  <p className="font-bold">{q.question}</p>
                  <p className="text-sm text-gray-500">Skill: {q.skill}</p>
                  <ul className="list-disc pl-5">
                    {q.options.map((opt, idx) => (
                      <li
                        key={idx}
                        className={idx === q.correctAnswer ? 'text-green-600' : ''}
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => deleteQuestion(q.id)}
                    className="mt-2 text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

    )


            }

            export default ViewQuestions;