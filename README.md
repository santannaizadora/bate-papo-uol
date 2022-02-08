# Bate-Papo UOL

# Descrição

Seu terceiro projeto com JavaScript será a implementação de um bate-papo totalmente funcional, inspirado no saudoso Bate-Papo UOL. Mas evite usar o site real da UOL como referência, pois apesar de inspirado nele, nossa interface é totalmente diferente.

# Requisitos

- Geral
    - [ ]  Não utilize nenhuma biblioteca para implementar este projeto (jquery, lodash, react, etc), nem outras linguagens que compilem para JS (TypeScript, Clojure, ELM, etc), somente JavaScript puro
    - [ ]  Seu projeto deverá ser desenvolvido utilizando Git e GitHub, em um repositório público
    - [ ]  **A cada requisito implementado** faça um *commit* com uma mensagem descritiva do que você evoluiu
- Layout
    - [ ]  Aplicar layout para mobile, seguindo Figma fornecido. Não é necessário implementar uma versão para desktop.
    
- Chat
    - [ ]  Ao entrar no site, este deve carregar as mensagens do servidor e exibi-las conforme layout fornecido
    - [ ]  Existem 3 tipos de mensagem:
        - Mensagens de status (**Entrou** ou **Saiu** da sala): deve ter o fundo cinza
        - Mensagens reservadas (**Reservadamente**): deve ter o fundo rosa
        - Mensagens normais: devem ter o fundo branco
    - [ ]  A cada 3 segundos o site deve recarregar as mensagens do servidor para manter sempre atualizado
    - [ ]  O chat deverá ter rolagem automática por padrão, ou seja, sempre que novas mensagens forem adicionadas ao final do chat ele deve scrollar para o final
        
        **Dica**: Você pode fazer com que um elemento apareça na tela utilizando a função `scrollIntoView`:
        
        ```jsx
        const elementoQueQueroQueApareca = document.querySelector('.mensagem');
        elementoQueQueroQueApareca.scrollIntoView();
        ```
        
        Se `elementoQueQueroQueApareca` estiver dentro de um elemento scrollável, o elemento será scrollado para que o `elementoQueQueroQueApareca` fique visível.
        
    - [ ]  As mensagens com **Reservadamente** só devem ser exibidas se o nome do destinatário for igual ao nome do usuário que está usando o chat (ou senão ele poderia ver as mensagens reservadas para outras pessoas)
        - Obs: Fazer essa filtragem no front-end não é uma boa prática, o ideal seria o servidor não fornecer essas mensagens para outras pessoas. Manteremos dessa forma por fins didáticos :)
    
- Entrada na sala
    - [ ]  Ao entrar no site, o usuário deverá ser perguntado com um `prompt` ****seu lindo nome
    - [ ]  Após inserção do nome, este deve ser enviado para o servidor pra cadastrar o usuário
        - Caso o servidor responda com sucesso, o usuário poderá entrar na sala
        - Caso o servidor responda com erro, deve-se pedir para o usuário digitar outro nome, pois este já está em uso
    - [ ]  Enquanto o usuário estiver na sala, a cada 5 segundos o site deve avisar ao servidor que o usuário ainda está presente, ou senão será considerado que "Saiu da sala"
- Envio de mensagem
    - [ ]  Ao enviar uma mensagem, esta deve ser enviada para o servidor
        - Caso o servidor responda com sucesso, você deve obter novamente as mensagens do servidor e atualizar o chat
        - Caso o servidor responda com erro, significa que esse usuário não está mais na sala e a página deve ser atualizada (e com isso voltando pra etapa de pedir o nome)
            
            **Dica**: experimente usar `window.location.reload()`
            
    - [ ]  Nesse envio, deve ser informado o remetente, o destinatário e se a mensagem é reservada ou não.
        - Escolher um destinário e se a mensagem é reservada ou pública é um **requisito bônus** (ver abaixo). Logo, se você não implementar o bônus, sempre envie destinatário como **Todos** e a mensagem como **pública**.

# Bônus (opcional)

- Participantes ativos
    - [ ]  Ao clicar no ícone superior direito de participantes, o menu lateral deve abrir por cima do chat conforme layout. Um fundo escuro semi-transparente deve ficar por cima do chat.
    - [ ]  Ao clicar no fundo escuro, o menu lateral deve ser ocultado novamente
    - [ ]  O site deve obter a lista de participantes assim que entra no chat e deve atualizar a lista a cada 10 segundos
    - [ ]  Ao clicar em uma pessoa ou em público/reservadamente, a opção clicada deve ser marcada com um check e as demais desmarcadas
    - [ ]  Além do check acima, ao trocar esses parâmetros também deve ser alterada a frase que informa o destinatário, que fica embaixo do input de mensagem

- Tela de entrada
    - [ ]  Em vez de um prompt, faça uma tela inicial, seguindo o layout fornecido.
        
- Envio com enter
    - [ ]  Faça com que, caso o usuário tecle Enter no campo de mensagem, ela seja enviada (ou seja, deve ter o mesmo comportamento caso o usuário clique no botão de envio)