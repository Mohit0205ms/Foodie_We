import axios from "axios"
import { useContext } from "react"
import UserContext from "../../context/UserContext"
import { useNavigate } from "react-router-dom";
const AdminBookTable = ({ Name, Email, Phone, Time, Duration, id }) => {
  const Navigate = useNavigate();
  const { tableBooking, setTableBooking } = useContext(UserContext);
  const handleAcceptButton = async () => {
    const res = await axios.post("/api/admin/accept/table/booking", { Email, role: 'admin' });
    if (res.data.success === false) {
      alert("please re-login. session expired");
      Navigate("/login");
    }
    else {
      const newArr = tableBooking;
      newArr.forEach((ele) => {
        if (ele._id === id) {
          ele.Status = "Resolve"
        }
      })
      setTableBooking([...newArr]);
    }
  }
  const handleRejectButton = async () => {
    const res = await axios.post("/api/admin/reject/table/booking/" + id, { role: 'admin' });
    if (res.data.success === false) {
      alert("please re-login. session expired");
      Navigate("/login");
    }
    else {
      const newArr = tableBooking;
      newArr.splice(newArr.findIndex(ele => ele._id === id), 1);
      setTableBooking([...newArr]);
    }
  }
  return (
    <>
      <div className="horizontal-card">
        <div className="info">
          <p>Name: {Name}</p>
          <p>Email: {Email}</p>
          <p>Phone No: {Phone} </p>
          <p>Time: {Time}</p>
          <p>Duration: {Duration}</p>
        </div>
        <div className="buttons">
          <button className="accept" onClick={handleAcceptButton}>Accept</button>
          <button className="reject" onClick={handleRejectButton}>Reject</button>
        </div>
      </div>
    </>
  )
}

export default AdminBookTable;