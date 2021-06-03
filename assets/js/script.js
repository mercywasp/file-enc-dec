// var myString   = "https://www.titanesmedellin.com/";
// var myPassword = "myPassword";


// // PROCESS
// var encrypted = CryptoJS.AES.encrypt(myString, myPassword);
// var decrypted = CryptoJS.AES.decrypt(encrypted, myPassword);
// document.getElementById("demo0").innerHTML = myString;
// document.getElementById("file-enc").innerHTML = encrypted;
// document.getElementById("file-dec").innerHTML = decrypted;

let encryptForm = document.getElementById('enc-form');
let decryptForm = document.getElementById('dec-form');
if (encryptForm)
    encryptForm.addEventListener("submit", handleEncrypt);
if (decryptForm)
    decryptForm.addEventListener("submit", handleDecrypt);

function handleEncrypt(event) {
    let password = document.getElementById("password").value;
    let file = document.getElementById("enc-file").files[0];
    let downloadBtn = document.getElementById("enc-download");
    let encrypted = "";
    let reader = new FileReader();

    reader.onload = (e) => {
        encrypted = CryptoJS.AES.encrypt(e.target.result, password);
        downloadBtn.setAttribute("href", 'data:application/octet-stream,' + encrypted)
        downloadBtn.setAttribute("download", file.name + ".encrypted");
    }

    reader.readAsDataURL(file);
    event.preventDefault();
}

function handleDecrypt(event) {
    let password = document.getElementById("password").value;
    let file = document.getElementById("dec-file").files[0];
    let downloadBtn = document.getElementById("dec-download");
    let decrypted = "";
    let reader = new FileReader();

    reader.onload = (e) => {
        decrypted = CryptoJS.AES.decrypt(e.target.result, password).toString(CryptoJS.enc.Latin1);
        if (!/^data:/.test(decrypted)) {
            alert("Invalid pass phrase or file! Please try again.");
            return false;
        }
        downloadBtn.setAttribute('href', decrypted);
        downloadBtn.setAttribute('download', file.name.replace('.encrypted', ''));
    }
    reader.readAsText(file);
    event.preventDefault();
}