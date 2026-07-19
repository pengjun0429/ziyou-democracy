function sendCustomEmail(e) {
  if (!e || !e.response) return;

  var responses = e.response.getItemResponses();
  var email = e.response.getRespondentEmail();
  var name = "", isTeacher = "", isRepresentative = "", school = "", grade = "";

  for (var i = 0; i < responses.length; i++) {
    var item = responses[i].getItem().getTitle();
    var answer = responses[i].getResponse();
    if (item.indexOf("姓名") !== -1) name = answer;
    if (item.indexOf("老師") !== -1) isTeacher = answer;
    if (item.indexOf("代表") !== -1) isRepresentative = answer;
    if (item.indexOf("國中") !== -1) school = answer;
    if (item.indexOf("年級") !== -1) grade = answer;
  }

  if (!email) return;

  var fullSchool = school + " " + grade + " 資優班";
  var subject, message;

  if (isTeacher === "是") {
    subject = "資優民主國入籍申請 - 教師代為審核通知";
    message = name + " 老師您好，\n\n感謝您代表 " + fullSchool + " 申請加入資優民主國。您的申請將由專人審核，請耐心等候通知。\n\n審核通過後，將核發貴班「資優民主國班級身分證」及「班級護照」。\n\n資優民主國 入籍審核委員會";
  } else if (isRepresentative === "是") {
    subject = "資優民主國入籍申請 - 代表審核通知";
    message = name + " 您好，\n\n感謝您代表 " + fullSchool + " 申請加入資優民主國。我們將盡快審核您的代表資格與申請。\n\n審核通過後，將核發貴班「資優民主國班級身分證」及「班級護照」。\n\n資優民主國 入籍審核委員會";
  } else {
    subject = "資優民主國入籍申請 - 個人審核通知";
    message = name + " 同學您好，\n\n感謝您以 " + fullSchool + " 的身分申請加入資優民主國。您的個人入籍申請已收到，將由相關單位進行審核。\n\n審核通過後，將核發您的「資優民主國國民身分證」及「國民護照」。\n\n資優民主國 入籍審核委員會";
  }

  MailApp.sendEmail(email, subject, message);
}