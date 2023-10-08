function cs71ageCalculator() {
    //collect input from HTML form and convert into date format
    var userinput = document.getElementById("cs71DOB").value;
    var dob = new Date(userinput);
    const image = document.getElementById("cs71image");
    image.style.display = "none";

    //check user provide input or not
    if (userinput == null || userinput == '') {
        document.getElementById("cs71message").innerHTML = "**Choose a date please!";
        return false;
    }
    else {
        document.getElementById("cs71message").innerHTML = "";
        //extract the year, month, and date from user date input
        var dobYear = dob.getYear();
        var dobMonth = dob.getMonth();
        var dobDate = dob.getDate();

        var now = new Date();
        //extract the year, month, and date from current date
        var currentYear = now.getYear();
        var currentMonth = now.getMonth();
        var currentDate = now.getDate();

        //declare a variable to collect the age in year, month, and days
        var age = {};
        var ageString = "";

        yearAge = currentYear - dobYear;

        if (currentMonth >= dobMonth)
            //get months when current month is greater
            var monthAge = currentMonth - dobMonth;
        else {
            yearAge--;
            var monthAge = 12 + currentMonth - dobMonth;
        }

        if (currentDate >= dobDate)
            //get days when the current date is greater
            var dateAge = currentDate - dobDate;
        else {
            monthAge--;
            var dateAge = 31 + currentDate - dobDate;

            if (monthAge < 0) {
                monthAge = 11;
                yearAge--;
            }
        }
        age = {
            years: yearAge,
            months: monthAge,
            days: dateAge
        };


        if ((age.years > 0) && (age.months > 0) && (age.days > 0))
            ageString = age.years + " years, " + age.months + " months, and " + age.days + " days old.";
        else if ((age.years == 0) && (age.months == 0) && (age.days > 0))
            ageString = "Only " + age.days + " days old👶";
        //when current month and date is same as birth date and month
        else if ((age.years > 0) && (age.months == 0) && (age.days == 0)) {
            ageString = age.years + " years old. Happy Birthday✨";
            image.src = "https://i0.wp.com/acegif.com/wp-content/gif/hapby-cat-32.gif";
            image.style.display = "block";

        }
        else if ((age.years > 0) && (age.months > 0) && (age.days == 0))
            ageString = age.years + " years and " + age.months + " months old.";
        else if ((age.years == 0) && (age.months > 0) && (age.days > 0))
            ageString = age.months + " months and " + age.days + " days old.";
        else if ((age.years > 0) && (age.months == 0) && (age.days > 0))
            ageString = age.years + " years, and" + age.days + " days old.";
        else if ((age.years == 0) && (age.months > 0) && (age.days == 0))
            ageString = age.months + " months old.";
        else if (age.years < 0) {
            image.src = "https://th.bing.com/th/id/R.fbcad0ba0bf7432ead187816ff7cc8a7?rik=BiB3qvHlgWxsng&pid=ImgRaw&r=0";
            image.style.display = "block";
            ageString = "oh no are u from future  or another dimension🌠  ";
        }
        //when current date is same as dob(date of birth)
        else {
            image.src = "https://th.bing.com/th/id/R.f7e7cfbb67a8a375c3da7f68840dfd76?rik=AU8poQOyLeu53w&riu=http%3a%2f%2fbestanimations.com%2fMusic%2fDancers%2fFamousBaby%2fdancing-baby2.gif&ehk=zUGQwTD2x8e%2bsA1mdiLShNiRM%2fSPwIPmDCcXTjqlZYY%3d&risl=&pid=ImgRaw&r=0";
            image.style.display = "block";
            ageString = "Welcome to Earth! <br> It's the first day on Earth!";
        }
        // console.log(age);
        return document.getElementById("cs71result").innerHTML = ageString;

    }
}
