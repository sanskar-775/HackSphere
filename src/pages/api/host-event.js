export default function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log("Received data:", data);

    // **This part is changed to ALWAYS be successful**
    res.status(200).json({ message: "Event submitted successfully!" });

  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}