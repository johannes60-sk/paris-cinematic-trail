// import React, { useEffect, useState } from "react";
// import './../styles/main.css'
// import { FilterByBorough } from "./FilterByBorough";


// const SelectFiled = (buttonSubmitted, resetButtonState) => {

//     const [fieldSelected, setFieldSelected] = useState([]);

//     const handleGetField = (e) => {
//         e.preventDefault();
//         e.stopPropagation();

//         const target = e.target;
//         const value = target.dataset.value;

//         if (target.classList.contains('selected')) {
//             console.log('target contains selected', target.classList);
//             target.classList.remove('selected');
//             // Mise à jour du tableau en utilisant la fonction setFieldSelected
//             setFieldSelected(prevFieldSelected => prevFieldSelected.filter(item => item !== value));
//         } else if (!fieldSelected.includes(value)) {
//             target.classList.add('selected');
//             // Mise à jour du tableau en utilisant la fonction setFieldSelected
//             setFieldSelected(prevFieldSelected => [...prevFieldSelected, value]);
//         }

//     };

//     useEffect(() => {

//         if(buttonSubmitted){
//             console.log('buttonSubmitted',buttonSubmitted)
//         }

//         // if(fieldSelected.length > 0  && buttonSubmitted === true){

//         //     FilterByBorough(fieldSelected)
//         // }
//     },[buttonSubmitted])


//     useEffect(() => {

//         if(fieldSelected.length > 0){
//             console.log('fieldSelected', fieldSelected);
//         }

//     }, [fieldSelected])

//     return (

//         <div class="dropdown">
//             <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
//                 aria-expanded="false" style={{ height: '57px' }}>
//                 Dropdown button
//             </button>
//             <ul class="dropdown-menu" id="selectFiledAttribut" onClick={handleGetField} style={{padding: '0'}}>
//                 <ul class="list-group list-group-horizontal-sm">
//                     <li class="list-group-item" data-value='property1'>An item</li>
//                     <li class="list-group-item" data-value='property2'>A second item</li>
//                     <li class="list-group-item" data-value='property3'>A third item</li>
//                 </ul>
//                 <ul class="list-group list-group-horizontal-sm">
//                     <li class="list-group-item" data-value='property4'>An item</li>
//                     <li class="list-group-item" data-value='property5'>A second item</li>
//                     <li class="list-group-item" data-value='property6'>A third item</li>
//                 </ul>
//             </ul>
//         </div>
//     )

// }

// export default SelectFiled