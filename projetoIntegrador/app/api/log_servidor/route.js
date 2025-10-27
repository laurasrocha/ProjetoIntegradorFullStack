export async function POST(req) {
    const dados = await req.json();

    //OU posso pegar informações pequenas 
    console.log("********************************************");
    //Posso pegar o JSON completo como abaixo 
    console.log("Mensagem recebida do frontEnd:", dados);
    //console.log(`Quem mandou: ${dados.usuario}`);
    //console.log(`O que fez: ${dados.acao}`);
    //console.log(`Hora do LOG: ${dados.horario}`);
    console.log("********************************************");
    //retornando msg ao Console do Navegador
    return Response.json("ok LOG recebido pelo Back-End");
}
