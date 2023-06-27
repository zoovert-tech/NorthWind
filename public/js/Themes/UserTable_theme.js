function ChangeTheme() {
    var btnValue = document.getElementById('theme-changerID').value;
    if (btnValue == 'light') {
        document.getElementById('theme-changerID').value = 'dark';
        document.getElementById('main-table-ID').classList.add('table-dark');

        // change body
        document.body.style.backgroundColor = '#333';
    }
    else {
        document.getElementById('theme-changerID').value = 'light';
        document.getElementById('main-table-ID').classList.remove('table-dark');
        
        // change body
        document.body.style.backgroundColor = 'white';
    }

    console.log('current Theme is ' + document.getElementById('theme-changerID').value);
}