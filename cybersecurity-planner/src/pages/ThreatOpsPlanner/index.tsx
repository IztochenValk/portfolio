import React from "react";
import MitreSection from "@/components/ThreatOpsPlanner/MitreSection";
import ProgressBar from "@/components/ThreatOpsPlanner/ProgressBar";
import VersionsButtons from "@/components/ThreatOpsPlanner/VersionsButtons";
import SaveScenario from "@/components/ThreatOpsPlanner/SaveScenario";

const ThreatOpsPlanner: React.FC = () => {
  return (
    <div className="threat-ops-planner">
      <VersionsButtons />
      <MitreSection />
      <ProgressBar />
      <SaveScenario />
    </div>
  );
};

export default ThreatOpsPlanner;
