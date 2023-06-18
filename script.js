pegarData();

function pegarData() {
  const data = new Date();
  const spanDataAtual = document.getElementById("data");

  const dataAtual = data.toLocaleDateString() + " " + data.toLocaleTimeString();

  spanDataAtual.textContent = dataAtual;
}

async function gerarPDF() {
  const nome = document.getElementById("nome");
  const opt = {
    filename: `${contrato.value}` + " - " + `${nome.value}`,
    image: {
      type: "jpge",
      quality: 1,
    },

    margin: 0,

    html2canvas: {
      dpi: 192,
      letterRendering: true,
      allowTaint: true,
      logging: true,
    },

    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
      compress: true,
    },
  };

  const elements = Array.from(document.querySelectorAll(".layout-page"));

  let worker = html2pdf().set(opt).from(elements[0]);


  if (elements.length > 1) {
    worker = worker.toPdf();

    elements.slice(1).forEach(async (element) => {
      worker = worker
        .get("pdf")
        .then((pdf) => {
          pdf.addPage();
        })
        .from(element)
        .toContainer()
        .toCanvas()
        .toPdf();
    });

  }

  return worker.output('blob');
}


function salvarPDFsemContrato() {
  const nome = document.getElementById("nome");
  const opt = {
    filename: `${contrato.value}` + " - " + `${nome.value}`,
    image: {
      type: "jpge",
      quality: 0.98,
    },

    margin: 0,

    html2canvas: {
      dpi: 192,
      letterRendering: true,
      allowTaint: true,
      logging: true,

    },

    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
      compress: true,
    },
  };

  const elements = Array.from(document.querySelectorAll(".layout-page"));

  let worker = html2pdf()
    .set(opt)
    .from(elements[0]);

  if (elements.length > 1) {
    worker = worker.toPdf();

    elements.slice(1).forEach(async element => {
      worker = worker
        .get('pdf')
        .then(pdf => {
          pdf.addPage();
        })
        .from(element)
        .toContainer()
        .toCanvas()
        .toPdf();
    });
  }

  worker.save();

}

function atualizarInformacoes() {
  let numeroContrato = document.getElementById("contrato");
  let atualizarNumeroDeContratos = document.querySelectorAll(".numeroContrato");
  let nucleo = document.getElementById("nucleo");
  let atualizarNumeroNucleo = document.querySelectorAll(".numeroNucleo");
  let reurb = document.getElementById("reurb");
  let atualizarNumeroReurb = document.querySelectorAll(".numeroReurb");
  let nome = document.getElementById("nome");
  let nomeConjuge = document.getElementById("nomeConjuge");
  let nomeCliente = document.getElementById("nomeCliente");
  let valorContrato = document.getElementById("valor");
  let valorContratoAtualizar = document.getElementById("valorContrato");
  let email = document.getElementById("email");
  let emailBoleto = document.getElementById("emailBoleto");

  nome.addEventListener('keyup', converterParaMaiusculo);
  nomeConjuge.addEventListener('keyup', converterParaMaiusculoC);

  atualizarNumeroDeContratos.forEach((item, index) => {
    atualizarNumeroDeContratos[index].textContent = numeroContrato.value;
  });

  atualizarNumeroNucleo.forEach((item, index) => {
    atualizarNumeroNucleo[index].textContent = nucleo.value;
  });

  atualizarNumeroReurb.forEach((item, index) => {
    atualizarNumeroReurb[index].textContent = reurb.value;
  });

  valorContratoAtualizar.textContent = "R$ " + valorContrato.value;

  emailBoleto.textContent = email.value;

  nomeCliente.textContent = nome.value;
}


function converterParaMaiusculo() {
  var input = document.getElementById('nome');
  var valor = input.value;
  input.value = valor.toUpperCase();
}

function converterParaMaiusculoC() {
  var input = document.getElementById('nomeConjuge');
  var valor = input.value;
  input.value = valor.toUpperCase();
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

const estCivil = document.querySelectorAll("input[type=radio]");
let valorEstCivil = 1;
const dadosConjuge = document.querySelector(".conjuge");
const certCasamento = document.querySelector('.s-certidao-casamento');
estCivil.forEach((e) => {
  e.addEventListener("click", () => {
    if (e.value === '0') {
      removeChecked();
      addChecked(e);
      certCasamento.classList.remove('layout-page');
      dadosConjuge.style.display = 'none';
      certCasamento.style.display = 'none';
    } else {
      certCasamento.classList.add('layout-page');
      dadosConjuge.style.display = 'block';
      certCasamento.style.display = 'block';
    }
    valorEstCivil = e.value;
  })
})

function addChecked(e) {
  e.setAttribute('checked', true);
}

function removeChecked(e) {
  estCivil.forEach((e) => {
    e.removeAttribute('checked', false);
  })
}


const signaturePad1 = document.getElementById("js-modalAssinatura");
const signaturePad2 = document.getElementById("js-modalAssinatura2");
const signaturePad3 = document.getElementById("js-modalAssinatura3");

const btnAbrirSignaturePad = document.querySelector("#abrirSignaturePad");
const btnSalvarSignaturePad = document.querySelector(".salvar");
const btnLimparSignaturePad = document.querySelector(".limpar");

const btnAbrirSignaturePad2 = document.querySelector("#abrirSignaturePad2");
const btnSalvarSignaturePad2 = document.querySelector(".salvar2");
const btnLimparSignaturePad2 = document.querySelector(".limpar2");

const btnAbrirSignaturePad3 = document.querySelector("#abrirSignaturePad3");
const btnSalvarSignaturePad3 = document.querySelector(".salvar3");
const btnLimparSignaturePad3 = document.querySelector(".limpar3");

const canvas1 = document.getElementById("signature1");
const signaturePad11 = new SignaturePad(canvas1);
signaturePad11.penColor = "rgb(0,30,100)";

const canvas3 = document.getElementById("signature3");
const signaturePad33 = new SignaturePad(canvas3);
signaturePad33.penColor = "rgb(0,30,100)";

function abrirSignaturePad() {
  signaturePad1.classList.add("active");
}

function abrirSignaturePad2() {
  signaturePad2.classList.add("active");
}

function abrirSignaturePad3() {
  signaturePad3.classList.add("active");
}

function salvarSignaturePad() {
  const signatureImage = signaturePad11.toDataURL();
  const assinatura = document.getElementById("abrirSignaturePad");

  const assinaturaCheckin1 = document.querySelector(".assinaturaCheckin1");
  const assinaturaCheckin2 = document.querySelector(".assinaturaCheckin2");
  const assinaturaCheckin3 = document.querySelector(".assinaturaCheckin3");
  const assinaturaCheckin4 = document.querySelector(".assinaturaCheckin4");
  const assinaturaCheckin5 = document.querySelector(".assinaturaCheckin5");
  const assinaturaCheckin6 = document.querySelector(".assinaturaCheckin6");
  const assinaturaCheckin7 = document.querySelector(".assinaturaCheckin7");
  const assinaturaCheckin8 = document.querySelector(".assinaturaCheckin8");

  const image1 = new Image();
  const image2 = new Image();
  const image3 = new Image();
  const image4 = new Image();
  const image5 = new Image();
  const image6 = new Image();
  const image7 = new Image();
  const image8 = new Image();
  const image9 = new Image();
  const image10 = new Image();

  image1.src = signatureImage;
  image2.src = signatureImage;
  image3.src = signatureImage;
  image4.src = signatureImage;
  image5.src = signatureImage;
  image6.src = signatureImage;
  image7.src = signatureImage;
  image8.src = signatureImage;
  image9.src = signatureImage;
  image10.src = signatureImage;

  assinatura.innerHTML = "";
  assinatura.appendChild(image1);

  assinaturaCheckin1.innerHTML = "";
  assinaturaCheckin1.appendChild(image2);

  assinaturaCheckin2.innerHTML = "";
  assinaturaCheckin2.appendChild(image3);

  assinaturaCheckin3.innerHTML = "";
  assinaturaCheckin3.appendChild(image4);

  assinaturaCheckin4.innerHTML = "";
  assinaturaCheckin4.appendChild(image5);

  assinaturaCheckin5.innerHTML = "";
  assinaturaCheckin5.appendChild(image6);

  assinaturaCheckin6.innerHTML = "";
  assinaturaCheckin6.appendChild(image7);

  assinaturaCheckin7.innerHTML = "";
  assinaturaCheckin7.appendChild(image8);

  assinaturaCheckin8.innerHTML = "";
  assinaturaCheckin8.appendChild(image9);

  signaturePad1.classList.remove("active");
}

var assinatura2 = document.getElementById("abrirSignaturePad2");

var imageAssinatura2 = new Image();

var validador1 = "";

var assinatura3 = document.getElementById("abrirSignaturePad3");

var imageAssinatura3 = new Image();

var validador2 = "";

function salvarSignaturePad3() {
  const signatureImage = signaturePad33.toDataURL();

  if (validador2 != "") {
    imageAssinatura3.src = validador2;
    assinatura3.innerHTML = "";
    assinatura3.appendChild(imageAssinatura3);
    signaturePad3.classList.remove("active");
    validador2 = "";
  } else {
    imageAssinatura3.src = signatureImage;
    assinatura3.innerHTML = "";
    assinatura3.appendChild(imageAssinatura3);

    signaturePad3.classList.remove("active");
  }
}

function limparSignaturePad() {
  signaturePad11.clear();
}

function limparSignaturePad3() {
  signaturePad33.clear();
  pictureAssinatura3.innerHTML = "";
  assinatura3.innerHTML = "";
}

//ADICIONAR FOTO AO CONTRATO
const inputFile = document.querySelector("#picture__input");
const pictureImage = document.querySelector(".picture__image");
const pictureImageTxt = "Incluir Imagem";
pictureImage.innerHTML = pictureImageTxt;

inputFile.addEventListener("change", function (e) {
  const inputTarget = e.target;
  const file = inputTarget.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      const readerTarget = e.target;

      const img = document.createElement("img");
      img.src = readerTarget.result;
      img.classList.add("picture__img");

      pictureImage.innerHTML = "";
      pictureImage.appendChild(img);
    });

    reader.readAsDataURL(file);
  } else {
    pictureImage.innerHTML = pictureImageTxt;
  }
});

//RG FRENTE
const inputFileRG_Frente = document.querySelector("#picture_input_rg_cnh_frente");
const pictureImage2 = document.querySelector(".picture_image2");
const pictureImageTxt2 = "RG OU CNH FRENTE";
pictureImage2.innerHTML = pictureImageTxt2;

inputFileRG_Frente.addEventListener("change", function (e) {
  const inputTarget = e.target;
  const file = inputTarget.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      const readerTarget = e.target;

      const img = document.createElement("img");
      img.src = readerTarget.result;
      img.classList.add("picture_img2");

      pictureImage2.innerHTML = "";
      pictureImage2.appendChild(img);
    });

    reader.readAsDataURL(file);
  } else {
    pictureImage2.innerHTML = pictureImageTxt2;
  }
});

//RG VERSO
const inputFileRG_Verso = document.querySelector("#picture_input_rg_cnh_verso");
const pictureImage3 = document.querySelector(".picture_image3");
const pictureImageTxt3 = "RG OU CNH VERSO";
pictureImage2.innerHTML = pictureImageTxt2;

inputFileRG_Verso.addEventListener("change", function (e) {
  const inputTarget = e.target;
  const file = inputTarget.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      const readerTarget = e.target;

      const img = document.createElement("img");
      img.src = readerTarget.result;
      img.classList.add("picture_img3");

      pictureImage3.innerHTML = "";
      pictureImage3.appendChild(img);
    });

    reader.readAsDataURL(file);
  } else {
    pictureImage3.innerHTML = pictureImageTxt3;
  }
});

//CERTIDÃO CASAMENTO
const inputFileRG_Certidao_Casamento = document.querySelector("#picture_input_certidao_casamento");
const pictureImage4 = document.querySelector(".picture_image4");
const pictureImageTxt4 = "CERTIDÃO CASAMENTO";
pictureImage4.innerHTML = pictureImageTxt4;

inputFileRG_Certidao_Casamento.addEventListener("change", function (e) {
  const inputTarget = e.target;
  const file = inputTarget.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      const readerTarget = e.target;

      const img = document.createElement("img");
      img.src = readerTarget.result;
      img.classList.add("picture_img3");

      pictureImage4.innerHTML = "";
      pictureImage4.appendChild(img);
    });

    reader.readAsDataURL(file);
  } else {
    pictureImage4.innerHTML = pictureImageTxt4;
  }
});

//CERTIDÃO NASCIMENTO
const inputFileRG_Certidao_Nascimento = document.querySelector("#picture_input_certidao_nascimento");
const pictureImage5 = document.querySelector(".picture_image5");
const pictureImageTxt5 = "CERTIDÃO NASCIMENTO";
pictureImage5.innerHTML = pictureImageTxt5;

inputFileRG_Certidao_Nascimento.addEventListener("change", function (e) {
  const inputTarget = e.target;
  const file = inputTarget.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      const readerTarget = e.target;

      const img = document.createElement("img");
      img.src = readerTarget.result;
      img.classList.add("picture_img5");

      pictureImage5.innerHTML = "";
      pictureImage5.appendChild(img);
    });

    reader.readAsDataURL(file);
  } else {
    pictureImage5.innerHTML = pictureImageTxt5;
  }
});

//BAIXAR ASSINATURAS
function baixarAssinatura2() {
  const btnDownload = document.querySelector(".download2");
  btnDownload.setAttribute("href", signaturePad33.toDataURL());
}

//INSERIR ASSINATURA 3
const inputAssinatura3 = document.querySelector("#assinatura3");
const pictureAssinatura3 = document.querySelector(".canvas2");

inputAssinatura3.addEventListener("change", function (e) {
  const inputTarget = e.target;
  const file = inputTarget.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      const readerTarget = e.target;

      const img = document.createElement("img");
      img.src = readerTarget.result;
      img.classList.add("canvas2");

      limparSignaturePad3();
      pictureAssinatura3.appendChild(img);
      validador2 = readerTarget.result;
    });

    reader.readAsDataURL(file);
  }
});

//VALIDAR INPUTS VAZIOS

function validarInputs() {
  const inputs = document.querySelectorAll("input");
  const pictureInput = document.querySelector("#picture__input");
  const campoInvalido = document.querySelector(".invalido");
  const detalhesdoPagamento = document.getElementById('detalhesdopagamento');

  const picture_input_rg_cnh_frente = document.getElementById('picture_input_rg_cnh_frente');
  const picture_input_rg_cnh_verso = document.getElementById('picture_input_rg_cnh_frente');
  const picture_input_certidao_casamento = document.getElementById('picture_input_rg_cnh_frente');
  const picture_input_certidao_nascimento = document.getElementById('picture_input_rg_cnh_frente');
  const btnAnexarPdf = document.getElementById('btn-anexar-pdf');
  const uploadPDF = document.getElementById('upload-PDF');
  let cont = 0;

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() === "") {

      if (i != 0 && i != 26 && i != 27 && i != 7 && i != 40 ) {
        cont += 1;
        inputs[i].style.borderBottom = "1px solid red";
      }

      if (detalhesdoPagamento.value == '') {
        cont += 1;
        detalhesdoPagamento.style.border = '1px solid red';
      }

      if (signaturePad11.isEmpty()) {
        cont += 1;
        campoInvalido.style.borderBottom = "1px solid red";
      }

      if (signaturePad33.isEmpty()) {
        cont += 1;
        campoInvalido.style.borderBottom = "1px solid red";
      }
      
    }

    if (pictureInput.value.trim() === "") {
      cont += 1;
      document.querySelector(".picture__image").style.color = "red";
    }

    if (inputs[i].value.trim() !== "") {
      inputs[i].style.borderBottom = "none";
    }

    if (!signaturePad11.isEmpty()) {
      campoInvalido.style.borderBottom = "1px solid black";
    }

    if (!signaturePad33.isEmpty()) {
      campoInvalido.style.borderBottom = "1px solid black";
    }

    if (detalhesdoPagamento.value != '') {
      detalhesdoPagamento.style.border = 'none';
    }

    if (picture_input_rg_cnh_frente.value.trim() === "") {
      document.querySelector(".picture_image2").style.color = "red";
    }
    if (picture_input_rg_cnh_verso.value.trim() === "") {
      document.querySelector(".picture_image3").style.color = "red";
    }
    if (picture_input_certidao_casamento.value.trim() === "") {
      document.querySelector(".picture_image4").style.color = "red";
    }
    if (picture_input_certidao_nascimento.value.trim() === "") {
      document.querySelector(".picture_image5").style.color = "red";
    }
    if (uploadPDF.value.trim() === '') {
      btnAnexarPdf.style.backgroundColor = '#eb5b5b';
    } else {
      btnAnexarPdf.style.backgroundColor = '#5beb62';
    }

  }

  
  if (valorEstCivil == '0') {
    cont = cont - 12;
  }


  if (cont <= 600000) {
    Swal.fire({
      backgroundColor: "#00254c",
      color: "#00254c",
      title: "Deseja salvar?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        topFunction();

        if(document.getElementById('upload-PDF').files[0]){
          salvarPDF();
          // gerarNovoNumeroContrato();
          // setTimeout(() => {
          //   salvarPDFsemContrato();
          // }, 6000)
        }else{
          salvarPDFsemContrato();
          // gerarNovoNumeroContrato();
          // setTimeout(() => {
          //   salvarPDFsemContrato();
          // }, 6000)
        }

      }
    });
  } else {
    Swal.fire({
      title: "Contrato incompleto",
      icon: "info",
    });
  }

  console.log(cont);
}

window.addEventListener("beforeunload", function (e) {
  e.preventDefault();

  e.returnValue = "";
});

// Função para manipular o evento de seleção de arquivo pelo usuário
function salvarPDF() {
  const file = document.getElementById('upload-PDF').files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async () => {
      const pdfFile = new Blob([reader.result]);
      try {
        const pdfPart = await gerarPDF();
        mergeBlobsAndDownload(pdfPart, pdfFile);
      } catch (error) {
        console.error(error);
      }
    };
    reader.onerror = (error) => {
      console.error(error);
    };
    reader.readAsArrayBuffer(file);
  }
}

async function mergeBlobsAndDownload(blob1, blob2) {
  // Crie uma instância do PDFDocument
  const { PDFDocument, StandardFonts } = PDFLib;
  const pdfDoc = await PDFDocument.create();

  // Carregue o conteúdo dos blobs como arrays de bytes
  const bytes1 = await blob1.arrayBuffer();
  const bytes2 = await blob2.arrayBuffer();

  // Carregue os documentos PDF dos blobs
  const existingPdfDoc1 = await PDFDocument.load(bytes1);
  const existingPdfDoc2 = await PDFDocument.load(bytes2);

  // Copie as páginas do primeiro documento PDF para o novo documento
  const pages1 = await pdfDoc.copyPages(existingPdfDoc1, existingPdfDoc1.getPageIndices());
  pages1.forEach((page) => {
    pdfDoc.addPage(page);
  });

  // Copie as páginas do segundo documento PDF para o novo documento
  const pages2 = await pdfDoc.copyPages(existingPdfDoc2, existingPdfDoc2.getPageIndices());
  pages2.forEach((page) => {
    pdfDoc.addPage(page);
  });

  // Obtenha o conteúdo em formato de array de bytes do novo documento PDF
  const pdfBytes = await pdfDoc.save();

  // Crie um novo Blob a partir do array de bytes do PDF
  const mergedBlob = new Blob([pdfBytes], { type: 'application/pdf' });

  // Crie um URL temporário para o Blob
  const mergedBlobUrl = URL.createObjectURL(mergedBlob);

  // Crie um link de download e defina o URL do Blob como o destino
  const nome = document.getElementById("nome");
  const downloadLink = document.createElement('a');
  downloadLink.href = mergedBlobUrl;
  downloadLink.download = `${contrato.value}` + " - " + `${nome.value}`;

  // Adicione o link de download ao documento e clique automaticamente nele para iniciar o download
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // Remova o link de download e revogue o URL temporário
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(mergedBlobUrl);
}






