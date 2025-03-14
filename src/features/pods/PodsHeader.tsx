import Typography from "@/components/ui/typography";
import PodsDialog from "@/features/pods/PodsDialog";
const PodsHeader = () => {
    return (
        <div className="flex flex-row gap-2 justify-between">
            <Typography variant="h1">Pods</Typography>
            <PodsDialog />
        </div>
    )
}

export default PodsHeader;
