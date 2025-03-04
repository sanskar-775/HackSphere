import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Settings = () => {
  const { token } = useSelector((state) => state.user);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      // Replace with actual API
      // const response = await axios.get("API_URL", { headers: { Authorization: `Bearer ${token}` } });
      setUserData({ name: "John Doe", email: "john@example.com" });
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Replace with actual API
      // await axios.post("API_URL", userData, { headers: { Authorization: `Bearer ${token}` } });
      alert("Profile updated!");
    } catch (error) {
      console.error("Error updating profile", error);
    }
    setIsSaving(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Settings</h2>
      <div className="mt-4">
        <label>Name</label>
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className="input input-bordered w-full mt-2"
        />
      </div>
      <div className="mt-4">
        <label>Email</label>
        <input type="email" value={userData.email} className="input input-bordered w-full mt-2" disabled />
      </div>
      <button className="btn btn-primary mt-4" onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default Settings;
