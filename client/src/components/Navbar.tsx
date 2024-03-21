import { Separator } from "@/components/ui/separator";

export default function Navbar() {
    return (
        <>
            <div className="flex px-4 py-2 justify-between">
                <div className="text-3xl ">
                    <span className="text-red-600">tuf</span>Code
                </div>
            </div>
            <Separator />
        </>
    );
}
