const TaskDAO = require('../dao/tasks-dao');
const taskDAO = new TaskDAO();


class TaskController {
    listar() {
        return function(req, res) {
            const sessao = req.session;
            if (sessao.nome) {
                taskDAO.listar(sessao.userId).then(
                    tarefas => {
                        res.render('tarefas/listar', {
                            tarefas: tarefas,
                            sessao: sessao
                        });
                    }).catch(erro => console.log(erro));
            } else {
                res.redirect('/');
            }
        }
    }
}
module.exports = TaskController;