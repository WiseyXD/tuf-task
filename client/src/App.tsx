import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import SubmissionForm from "./pages/SubmissionForm";
import Results from "./pages/Results";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
function App() {
    return (
        <>
            <Navbar />
            <Toaster />
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
