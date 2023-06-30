
const all_ingredients = () => {
    
    let ingredients = document.querySelectorAll(".form-check-label");
    let labels = {};
    Array.from(ingredients).forEach((tag) => {
        let substrings = tag.innerHTML.split(":");
        
        if (substrings[0] in labels){
            labels[substrings[0]].amount += parseInt(substrings[1].split(" ")[1].split(" ")[0]);
        } else{
            labels[substrings[0]] = {};
            labels[substrings[0]]['amount'] = parseInt(substrings[1].split(" ")[1].split(" ")[0]);
            labels[substrings[0]]['amount_type'] = substrings[1].split(" ")[2];
        }
    });


    return labels;
}




export default all_ingredients;
