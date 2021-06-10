import React from "react";
function Alert(props) {
return (
<div className={`text-center w-full text-xl
bg-${props.color}-200 text-${props.color}-500 ${props.rounded}
font-medium p-3`}>
{props.children}
</div>
)
}
export default Alert;