const TaskDAO = require('../dao/tasks-dao');
const taskDAO = new TaskDAO();


class IndexController {
    /*
    Método index() da classe IndexController

    Verifica se o usuário já está logado if(req.session.nome). Se verdadeiro, redireciona o usuário automaticamente para a página /home.
    Senão, redireciona ele para a tela de login. Passamos para a tela de login o parâmetro "titulo" com valor "Agenda de tarefas". Esse parâmetro será exibido na página "index.ejs", que está na pasta "views"
    
    */
    index() {
        return function(req, res) {
            if (req.session.nome) {
                res.redirect('/home');
            } else {
                res.render('index', { titulo: 'Agenda de tarefas' });
            }
        }
    }
    home() {


        return function(req, res) {
            const sessao = req.session;
            if (sessao.nome) {
                taskDAO.listar(sessao.userId).then(tarefas => {
                    res.render('home', {
                        tarefas: tarefas,
                        sessao: sessao
                    }).catch(erro => console.log(erro))
                })
            } else {
                res.redirect("/");
            }
        }
    }
}
module.exports = IndexController;