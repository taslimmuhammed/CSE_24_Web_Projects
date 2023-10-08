function macConvert()
{
    const macTempInput=parseFloat(document.getElementById("macTemperature").value);
    const macFUnit=document.getElementById("macFromUnit").value;
    const macTUnit=document.getElementById("macToUnit").value;
    let macResult;
    if(isNaN(macTempInput))
    {
        document.getElementById("macResult").textContent="Please enter a value!!";
    }
    else
    {
        if(macFUnit==="celsius")
        {
            if(macTUnit==="fahrenheit")
            {   
                macResult=(macTempInput*9/5)+32;
            }
            else if(macTUnit==="kelvin")
            {
                macResult=macTempInput+273.15;
            }
            else
            {
                macResult=macTempInput;
            }
        }
        else if(macFUnit=="fahrenheit")
        {
            if(macTUnit=="celsius")
            {
                macResult=(macTempInput-32)*5/9;
            }
            else if(macTUnit=="kelvin")
            {
                macResult=((macTempInput-32)*5/9)+273.15;
            } 
            else
            {
                macResult=macTempInput;
            }
        } 
        else if(macFUnit==="kelvin")
        {
            if(macTUnit==="celsius")
            {
                macResult=macTempInput-273.15;
            } 
            else if(macTUnit==="fahrenheit")
            {
                macResult=(macTempInput*9/5)-459.67;
            } 
            else
            {
                macResult=macTempInput;
            }
        }
    document.getElementById("macResult").textContent=`${macResult.toFixed(2)} ${macTUnit}`;
    }
}    
document.getElementById("macConvertButton").addEventListener("click", macConvert);
