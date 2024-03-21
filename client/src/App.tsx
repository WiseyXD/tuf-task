import { Routes, Route } from "react-router-dom";
import SubmissionForm from "./pages/SubmissionForm";
import Results from "./pages/Results";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Navbar />
            <div className="w-[90%] mx-auto">
                <Routes>
                    <Route path="/" element={<SubmissionForm />} />
                    <Route path="/results" element={<Results />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
