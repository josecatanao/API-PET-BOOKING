const express = require('express');
const app = express();

//linkando com o mongo
const {conectarOMongo} = require("./src/mongoDB/server");

// linkando com os controllers
const ctrlUsuario = require("./src/controllers/usuario");
const ctrlAgenda = require("./src/controllers/agenda");
const crtlLocalizacao = require('./src/controllers/localizacaoController');

app.use(express.json());

const authMiddleware = require('./src/middleware/auth');

// linkando com uploads
const multer = require("multer");

const uploadConfig = require('./src/config/upload.js');

const upload = multer(uploadConfig);

// documentação com swagger
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// swagger setup
var swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Express de um gerenciador de pet shop.',
        version: '1.0.0',
        description: ('Esta é uma aplicação de API REST feita com Express' +
        'Ela utiliza dados de uma agenda de pet shop.'),
        license: {
            name: 'Licenciado sob GPL.',
            url: 'https://github.com/josecatanao/API-PET-BOOKING',
        },
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
};
var options = {
    swaggerDefinition,
    apis: ['./server.js'],
};
var swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Definindo os esquemas para a documentação Swagger.
/**
 * @swagger
 * components:
 *   schemas:
 *     NovoUsuario:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do contato.
 *           example: José David
 *         sobrenome:
 *           type: string
 *           description: Sobrenome do contato.
 *           example: Oliveira
 *         password:
 *           type: string
 *           description: Senha do usuário
 *           example: a2d1f34
 *         email:
 *           type: string
 *           description: E-mail do usuário
 *           example: jose@email.com
 *         tipoUsuario:
 *           type: string
 *           description: Tipo do usuário
 *           example: admin
 *         imgPerfil:
 *           type: string
 *           format: binary
 *           description: imagem de perfil
 *           example: Gato fofinho.png
 *     Usuario:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do contato.
 *           example: a32d45bvbv3
 *         nome:
 *           type: string
 *           description: Nome do contato.
 *           example: José David
 *         sobrenome:
 *           type: string
 *           description: Sobrenome do contato.
 *           example: Oliveira
 *         password:
 *           type: string
 *           description: Senha do usuário
 *           example: a2d1f34
 *         email:
 *           type: string
 *           description: E-mail do usuário
 *           example: jose@email.com
 *         tipoUsuario:
 *           type: string
 *           description: Tipo do usuário
 *           example: admin
 *         imagem:
 *           type: string
 *           format: binary
 *           description: ID da imagem de perfil
 *           example: b3f43bbqvw6
 *         __v:
 *           type: integer
 *           example: 0
 */

/**
 * @swagger
 * /usuario:
 *   get:
 *      summary: Recupera a lista de usuários.
 *      responses:
 *        200:
 *          content:
 *              application/json:
 *                  schema:
 *                            type: array
 *                            items:
 *                              $ref: '#/components/schemas/Usuario'
 */
//Busca todos os usuarios
app.get("/usuario",ctrlUsuario.listarUsuarios);

/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     summary: Recupera um único usuário.
 *     description: Recupera um único usuário do sistema pelo ID. Pode ser usado sem autenticação.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID númerico do usuário a ser recuperado.
 *         schema:
 *           type: string
 *     responses:
 *       400:
 *         description: erro
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 alerta:
 *                   type: string
 *                   example: Id não encontrando
 *       200:
 *         description: Um único usuário.
 *         content:
 *           application/json:
 *             schema:
 *                   $ref: '#/components/schemas/Usuario'
 */
//Busca o usuario pelo id
app.get("/usuario/:id",ctrlUsuario.buscarUsuario);

/**
 * @swagger
 * /usuario:
 *   post:
 *      summary: Cria um novo contato.
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/NovoUsuario'
 *      responses:
 *          500:
 *              description: error.
 *          200:
 *              description: usuario cadastrado com sucesso!
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              Mensagem:
 *                                  type: string
 *                                  example: usuario cadastrado com sucesso!
 *                              token:
 *                                  type: string
 *                                  example: adad454f4d5g3g2
 */
//adiciona um usuario
app.post("/usuario", upload.single('imgPerfil'), ctrlUsuario.addUsuario);

/**
 * @swagger
 * /usuario/authenticate:
 *    post:
 *      summary: Faz login.
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  example: jose@email.com
 *                              password:
 *                                  type: string
 *                                  example: adad454f4d5g3g2
 *      responses:
 *          400:
 *              description: error.
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  example: invalid password
 *          401:
 *              description: error.
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  example: User not found
 *          200:
 *              description: usuario logado com sucesso!
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              user:
 *                                  $ref: '#/components/schemas/Usuario'
 *                              token:
 *                                  type: string
 *                                  example: adad454f4d5g3g2
 */
//autenticar usuario
app.post("/usuario/authenticate", ctrlUsuario.autenticar);

/**
 * @swagger
 * /usuario/{id}:
 *   put:
 *      summary: Atualiza um usuário.
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  example: jose@email.com
 *                              tipoUsuario:
 *                                  type: string
 *                                  example: admin
 *                              nome:
 *                                  type: string
 *                                  example: José David
 *                              sobrenome:
 *                                  type: string
 *                                  example: Oliveira
 *      responses:
 *          400:
 *              description: error.
 *          200:
 *              description: usuario logado com sucesso!
 *              content:
 *                  application/json:
 *                      schema:
 *                                  type: string
 *                                  example: Success
 */
//Update de um usuario
app.put('/usuario/:id', ctrlUsuario.updateUsuario);

/**
 * @swagger
 * /usuario/{id}:
 *   delete:
 *     summary: Deleta um único usuário.
 *     description: Deleta um único usuário do sistema pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID númerico do usuário a ser deletado.
 *         schema:
 *           type: string
 *     responses:
 *       400:
 *         description: erro
 *       200:
 *         description: Usuário removido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Usuário removido com sucesso
 */
//Deleta um usuario
app.delete('/usuario/:id', ctrlUsuario.deleteUsuario);

//-----------------------------------------------------------
//Deleta um atendimento
app.delete('/agenda/:id',authMiddleware, ctrlAgenda.deletarAgenda);

//Update de um atendimento
app.put('/agenda/:id', authMiddleware, ctrlAgenda.updateAgenda);

//Busca todos os agendamentos
app.get("/agenda",authMiddleware, ctrlAgenda.listarAgendamentos);

//Busca o agendamento pelo id
app.get("/agenda/:id",authMiddleware,ctrlAgenda.buscarAgendamento);

//adiciona um agendamento
app.post("/agenda",authMiddleware, ctrlAgenda.addAgendamento);

//adicionar localização
app.post('/localizacao', crtlLocalizacao.addLocalizacao);

//listar localização
app.get('/localizacao', crtlLocalizacao.listarLocalizacao);

//buscar petShop
app.get('/localizacao/:nome', crtlLocalizacao.buscarPetShop);

// testando conexão com o mongo
conectarOMongo;


app.listen(3000, function(){
    console.log("Server inicializado")
})
