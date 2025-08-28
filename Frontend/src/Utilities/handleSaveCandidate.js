
import axios from "axios";


  const handleSaveCandidate = async (isSaved,BASEURL,token,candidate,setIsSaved) => {
    try {
      if (isSaved) {
        await axios.delete(`${BASEURL}/employer/saved-candidates/${candidate.user._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${BASEURL}/employer/saved-candidates`, 
          { candidateId: candidate.user._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Failed to toggle save candidate:", error);
    }
  };

  export default handleSaveCandidate;