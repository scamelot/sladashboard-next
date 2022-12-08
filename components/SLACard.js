import SLAField from "./SLAField";
import SLAChart from "./charts";

export default function SLACard({name, current, prev, data}) {
    return (
        <div className='flex md:flex-row sm:flex-col'>
        <SLAField name={name} value={current.value.toString()} prev={prev.date} prevValue={prev.value.toString()} />
        <SLAChart name={name} data={data} />
        </div>
    )
}