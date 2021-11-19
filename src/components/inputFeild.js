export default function InputFeild(props){
    return(
        <>
        <label>{props.label}</label>
        <input type={props.type} value={props.value} onChange={props.onChange} required={props.required} />
        </> 
    )
}