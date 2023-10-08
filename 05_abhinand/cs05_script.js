let button = document.getElementById('cs05_btn');

button.addEventListener('click', () => {
    const height = parseFloat(document.getElementById('cs05_height').value);
    const weight = parseFloat(document.getElementById('cs05_weight').value);
    const result = document.getElementById('cs05_output');
    let height_status=false, weight_status=false;

    if(height === '' || isNaN(height) || (height <= 0)){
        document.getElementById('cs05_height_error').innerHTML = 'Please provide a valid height';
    }else{
        document.getElementById('cs05_height_error').innerHTML = '';
        height_status=true;
    }

    if(weight === '' || isNaN(weight) || (weight <= 0)){
        document.getElementById('cs05_weight_error').innerHTML = 'Please provide a valid weight';
    }else{
        document.getElementById('cs05_weight_error').innerHTML = '';
        weight_status=true;
    }

    if(height_status && weight_status){
        const bmi = (weight / ((height*height)/10000)).toFixed(2);

        if(bmi < 18.6){
            result.innerHTML = 'Under weight : ' + bmi;
        }else if(bmi >= 18.6 && bmi < 24.9){
            result.innerHTML = 'Normal : ' + bmi;
        }else{
            result.innerHTML = 'Over weight : ' + bmi;
        }
    }else{
        alert('The form has errors');
        result.innerHTML = '';
    }
});
document.getElementById('cs05_reset_btn').addEventListener('click', function() {
    document.getElementById('cs05_height').value = '';
    document.getElementById('cs05_weight').value = '';
    document.getElementById('cs05_height_error').innerHTML = '';
    document.getElementById('cs05_weight_error').innerHTML = '';
    document.getElementById('cs05_output').innerHTML = '';
});