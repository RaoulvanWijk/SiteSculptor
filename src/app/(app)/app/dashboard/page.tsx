import SignIn from "@/components/auth/SignIn";
import DashboardCard from "@/components/dashboard/DashboardCard";
import Button from "@/components/interactives/Button";
import { getUserAuth } from "@/lib/auth/utils";

export default async function Home() {
    const { session } = await getUserAuth();
    return <main className="space-y-4">
        <h1>Welcome Back</h1>
        <h3>Continue where you left of</h3>
        <div className="project-row">
            {/* Logic to import element dynamically */}
            <DashboardCard type="standard" imgSrc="/placeholders/pc.jpg" projectName="Project Name Here" projectDesc="Project description here" />
            <DashboardCard type="standard" imgSrc="/placeholders/pc.jpg" projectName="Project Name Here" projectDesc="Project description here" />
            <DashboardCard type="standard" imgSrc="/placeholders/pc.jpg" projectName="Project Name Here" projectDesc="Project description here" />
        </div>
        <h3>Latest News</h3>
        <div className="project-row">
            {/* Logic to import element dynamically */}
            <DashboardCard type="withButton" imgSrc="/placeholders/pc.jpg" projectName="New Extension Released!" projectDesc="Extension description here">
                <Button type="primary">Check out the Extension!</Button>
            </DashboardCard>git reset --soft HEAD~
        </div>
    </main>;
}
