# messaging-service

## Install

    npm install 


## Usage
### Local

1. Run DynamoDB on Docker

        docker pull instructure/dynamo-local-admin
        docker run -d -p 8000:8000 -it --rm instructure/dynamo-local-admin
    
2. Copy 'serverless.env.template.yml' to 'serverless.env.yml'

3. Migrate DynamoDB tables

        npm run ddb:migrate

4. Run serverless appysync offline
        
        serverless appsync-offline start -s local

### AWS

1. Copy 'serverless.env.template.yml' to 'serverless.env.yml'. Fill up the needed variables for selected stage.

2. Deploy

        serverless deploy -s [stage]

## Graphql

### Mutation

  - [conversation-create](#conversation-create)
  - [conversation-read](#conversation-read)
  - [conversation-add-user](#conversation-add-user)
  - [conversation-delete-user](#conversation-delete-user)
  - [conversation-delete](#conversation-delete)
  - [message-create](#message-create)
  - [message-delete](#message-delete)
  - [message-read](#message-read)

### Query
  - [conversation](#conversation)
  - [conversations](#conversations)

### conversation-create

    mutation ($user : String!) {
        conversation_create(    
            createdBy: $user
        ){
            id
            createdAt
            createdBy
        }
    }

    Variables: 
    {
        "user": "jane"
    }

    Response:
    {
        "data": {
            "conversation_create": {
                "id": "cedd1a20-9b01-11e9-9ef9-efe5e5e82d5f",
                "createdAt": "2019-06-30T06:39:27.937Z",
                "createdBy": "jane"
            }
        }
    }

### conversation-read

    mutation ($id: ID! $userId: String!) {
        conversation_read(
            id: $id
            userId: $userId
        ) {
            id
            createdAt
            createdBy
            readBy
        }
    }
 

    Variables: 
    {
        "id" :  "36a77190-afb7-11e9-8166-e3b67b36d163",
        "userId": "12345"	
    }

    Response:
    {
        "data": {
            "conversation_read": {
                "id": "36a77190-afb7-11e9-8166-e3b67b36d163",
                "createdAt": "2019-07-26T15:08:24.232Z",
                "createdBy": "12345",
                "readBy": "[[\"12345\",\"2019-07-26T15:26:39.783Z\"],[\"12346\",\"2019-07-26T15:10:54.292Z\"]]"
            }
        }
    }

    NOTE: To unread a conversation call the same mutation

### conversation-add-user

    mutation ($id : ID! $userId: String!) {
        conversation_add_user(
            id: $id
            userId: $userId
        ) {
            userId
            conversationId
            conversation{
                id
                createdBy
                createdAt
                members {
                userId
                info {
                    userId
                    email
                    firstName
                    lastName
                    profileImageUrl
                }
                }
            }
                info {
            userId
            email
            firstName
            lastName
            profileImageUrl
            }
            isDeleted
            createdAt
        }
    }
    
    
    
    Variables: 
    {
        "id" :  "5a689400-a70c-11e9-879f-cd6e74840465",
        "userId": "12346"
    }

    Response:
    {
        "data": {
            "conversation_add_user": {
                "userId": "12346",
                "conversationId": "5a689400-a70c-11e9-879f-cd6e74840465",
                "conversation": {
                    "id": "5a689400-a70c-11e9-879f-cd6e74840465",
                    "createdBy": "12345",
                    "createdAt": "2019-07-15T14:25:10.975Z",
                    "members": [
                        {
                            "userId": "12345",
                            "info": {
                                "userId": "12345",
                                "email": "testt@hotmail.com",
                                "firstName": "Mah3e33wr767e3374442e434213l111",
                                "lastName": "Test933wwre76733336r244eeee43343219",
                                "profileImageUrl": "Test"
                            }
                        },
                        {
                            "userId": "12347",
                            "info": {
                                "userId": "12347",
                                "email": "testt@hotmail.com",
                                "firstName": "Mah3e33wr767e3374442e434213l111",
                                "lastName": "Test933wwre76733336r244eeee43343219",
                                "profileImageUrl": "Test"
                            }
                        },
                        {
                            "userId": "12346",
                            "info": {
                                "userId": "12346",
                                "email": "test@email.com",
                                "firstName": "test",
                                "lastName": "test",
                                "profileImageUrl": "Test"
                            }
                        }
                    ]
                },
                "info": {
                    "userId": "12346",
                    "email": "test@email.com",
                    "firstName": "test",
                    "lastName": "test",
                    "profileImageUrl": "Test"
                },
                "isDeleted": false,
                "createdAt": "2019-07-15T14:28:27.875Z"
            }
        }
    }

### conversation-delete-user

    mutation ($id : ID! $userId: String!) {
        conversation_delete_user(
            id: $id
            userId: $userId
        ) {
            userId
            conversationId
            conversation{
                id
                createdBy
                createdAt
            }
            isDeleted
            createdAt
        }
    }
    
    
    Variables: 
    {
        "id" :  "5a689400-a70c-11e9-879f-cd6e74840465",
        "userId": "12346"
    }

    Response:
    {
        "data": {
            "conversation_delete_user": {
                "userId": "12346",
                "conversationId": "5a689400-a70c-11e9-879f-cd6e74840465",
                "conversation": {
                    "id": "5a689400-a70c-11e9-879f-cd6e74840465",
                    "createdBy": "12345",
                    "createdAt": "2019-07-15T14:25:10.975Z"
                },
                "isDeleted": true,
                "createdAt": "2019-07-15T14:28:27.875Z"
            }
        }
    }
   

### conversation-delete

    mutation ($conversationId : ID!) {
        conversation_delete(
            id: $conversationId
        ) 
    }
    
    Variables: 
    {
        "conversationId" : "cedd1a20-9b01-11e9-9ef9-efe5e5e82d5f"
    }

    Response:
    {
        "data": {
            "conversation_delete": true
        }
    }

### message-create

    mutation ($conversationId: ID! $content: String! $createdBy: String! $isSystemGenerated: Boolean!) {
        message_create(
            conversationId: $conversationId
            content: $content
            createdBy: $createdBy
            isSystemGenerated: $isSystemGenerated
        ) {
            id
            content
            createdAt
            createdBy
            isDeleted
            readBy
            isSystemGenerated
        }
    }

    Variables: 
    {
        "conversationId" : "8157d7b0-9afa-11e9-9847-07f10a7d706e",
        "content"  : "Hello World",
        "createdBy" : "jane",
        "isSystemGenerated": false
    }

    Response:
    {
        "data": {
            "message_create": {
                "id": "message:8157d7b0-9afa-11e9-9847-07f10a7d706e:2019-06-30",
                "content": "Hello World",
                "contentUrl": "TBA",
                "createdAt": "2019-06-30T05:55:45.028Z",
                "createdBy": "jane",
                "isDeleted": false,
                "readBy": {},
                "isSystemGenerated": false
            }
        }
    }

### message-create upload images/files

    IMAGES:
        contentType: 'image'
        supported: any

    FILES:
        contentType: 'file/{mimeType}'
        supported mimeType: docx
                            xlsx, csv
                            txt,
                            pdf

    sample request:

        mutation ($conversationId: ID! $content: String $fileContent: String $fileName: String $isSystemGenerated: Boolean! $fileType: String!  $createdBy: String!) {
            message_create(
                content: $content
                conversationId: $conversationId
                fileContent : $fileContent
                fileName: $fileName
                fileType: $fileType
                createdBy: $createdBy
                isSystemGenerated: $isSystemGenerated
            ) {
                id
                content
                fileContent
                fileName
                fileType
                s3FileName
                createdAt
                createdBy
                isDeleted
                readBy
                conversationId
                isSystemGenerated
            }
        }
 
    Variables: 
        {
            "conversationId" : "6b8bcde0-aace-11e9-9074-057a8a0ae662",
            "isSystemGenerated": false,
            "content": "content",
            "fileName": "filenamee",
            "fileContent" : "data:application/octet-stream;base64,UEsDBBQ...AAAAAA==",
            "fileType": "file:docx",
            "createdBy" : "12345"
        }

    Response:
        {
            "data": {
                "message_create": {
                    "id": "message:6b8bcde0-aace-11e9-9074-057a8a0ae662:2019-08-05",
                    "content": null,
                    "fileContent": "https://messaging-service-bucket-dev.s3.ap-southeast-2.amazonaws.com/6b8bcde0-aace-11e9-9074-057a8a0ae662_ca0874c0-b796-11e9-8b8f-4b0343db5747_filenamee.docx",
                    "fileName": "filenamee",
                    "fileType": "file:docx",
                    "s3FileName": "6b8bcde0-aace-11e9-9074-057a8a0ae662_ca0874c0-b796-11e9-8b8f-4b0343db5747_filenamee.docx",
                    "createdAt": "2019-08-05T15:36:27.485Z",
                    "createdBy": "12345",
                    "isDeleted": false,
                    "readBy": "{}",
                    "conversationId": "6b8bcde0-aace-11e9-9074-057a8a0ae662",
                    "isSystemGenerated": false
                }
            }
        }

### message-delete

    mutation ($id: ID! $createdAt: String!) {
        message_delete(
            id: $id
            createdAt: $createdAt
        ) {
            id
            content
            contentUrl
            createdAt
            createdBy
            isDeleted
            readBy
        }
    }

    Variables: 
    {
        "id" : "message:b7153eb0-a653-11e9-880b-138fab43c608:2019-07-14",
        "createdAt" : "2019-07-14T16:26:12.331Z"
    }

    Response:
    {
        "data": {
            "message_delete": {
                "id": "message:b7153eb0-a653-11e9-880b-138fab43c608:2019-07-14",
                "content": "Hello World",
                "contentUrl": null,
                "createdAt": "2019-07-14T16:26:12.331Z",
                "createdBy": "jane",
                "isDeleted": true,
                "readBy": "[[\"john\",\"2019-07-14T16:26:43.473Z\"]]"
            }
        }
    }

### message-read

    mutation ($id: ID! $createdAt: String! $userId: String!) {
        message_read(
            id: $id
            createdAt: $createdAt
            userId: $userId
        ) {
            id
            content
            contentUrl
            createdAt
            createdBy
            isDeleted
            readBy
            conversationId
        }
    }
 

    Variables: 
    {
        "id" :  "message:b7153eb0-a653-11e9-880b-138fab43c608:2019-07-14",
        "createdAt" :  "2019-07-14T16:26:12.331Z",
        "userId": "john"	
    }

    Response:
    {
        "data": {
            "message_read": {
                "id": "message:b7153eb0-a653-11e9-880b-138fab43c608:2019-07-14",
                "content": "Hello World",
                "contentUrl": null,
                "createdAt": "2019-07-14T16:26:12.331Z",
                "createdBy": "jane",
                "isDeleted": false,
                "readBy": "[[\"john\",\"2019-07-14T16:26:43.473Z\"]]",
                "conversationId": "b7153eb0-a653-11e9-880b-138fab43c608"
            }
        }
    }

    NOTE: To unread a message call the same mutation

### conversation

    query ($id: ID! $from: String! $to: String!) {
        conversation(
            id: $id
            from: $from
            to: $to
        ) {
            id
            createdAt
            createdBy
            messages {
                id
                content
                contentUrl
                createdAt
                createdBy
                isDeleted
                readBy
            }
            members {
                userId
                isDeleted
                createdAt
                info {
                userId
                email
                firstName
                lastName
                profileImageUrl
                }
            }
        }
    }

    Variables: 
    {
        "id": "df2c7340-a708-11e9-86a9-5f9b40786ad4",
        "from": "2019-06-29T16:00:00.000Z",
        "to": "2019-06-30T15:59:59.999Z"
    } 

    Response:
    {
        "data": {
            "conversation": {
            "id": "df2c7340-a708-11e9-86a9-5f9b40786ad4",
            "createdAt": "2019-07-15T14:00:15.723Z",
            "createdBy": "12345",
            "messages": [],
            "members": [
                {
                "userId": "12345",
                "isDeleted": false,
                "createdAt": "2019-07-15T14:00:15.850Z",
                "info": {
                    "userId": "12345",
                    "email": "testt@hotmail.com",
                    "firstName": "Mah3e33wr767e3374442e434213l111",
                    "lastName": "Test933wwre76733336r244eeee43343219",
                    "profileImageUrl": "Test"
                }
                }
            ]
            }
        }
        }

### conversations

    query ($userId: String! $from: String! $to: String!) {
        conversations(
            userId: $userId
            from: $from
            to: $to
        ) {
            userId
            conversation {
                id
                createdAt
                createdBy
            }
            isDeleted
            createdAt
        }
    }

    Variables: 
    {
        "userId":  "jane",
        "from": "2019-06-29T16:00:00.000Z",
        "to": "2019-06-30T15:59:59.999Z"
    }

    Response:
    {
        "data": {
            "conversations": [
                {
                    "userId": "jane",
                    "conversation": {
                        "id": "79c3a240-9af5-11e9-a50f-bb028ee9a553",
                        "createdAt": "2019-06-30T05:11:11.204Z",
                        "createdBy": "jane"
                    },
                    "isDeleted": false,
                    "createdAt": "2019-06-30T05:11:11.230Z"
                },
                {
                    "userId": "jane",
                    "conversation": {
                        "id": "8157d7b0-9afa-11e9-9847-07f10a7d706e",
                        "createdAt": "2019-06-30T05:47:11.402Z",
                        "createdBy": "jane"
                    },
                    "isDeleted": false,
                    "createdAt": "2019-06-30T05:47:11.515Z"
                }
            ]
        }
    }
    
## Subscriptions

  - [conversation-add-user-subscription](#conversation_add_user-subscription)
  - [conversation-delete-user-subscription](#conversation-delete-user-subscription)
  - [message-create-subscription](#message-create-subscription)
  - [message-read-subscription](#message-read-subscription)

### conversation-add-user-subscription

    1. Subscribe
    subscription  {
        conversationAddUser (conversationId: "5a689400-a70c-11e9-879f-cd6e74840465"){
            userId
            conversationId
            createdAt
            info {
                userId
                email
                firstName
                lastName
                profileImageUrl
            }
        }
    }

    2. Send a conversation_add_user mutation

    mutation ($id : ID! $userId: String!) {
        conversation_add_user(
            id: $id
            userId: $userId
        ) {
            userId
            conversationId
            conversation{
                id
                createdBy
                createdAt
                members {
                userId
                info {
                    userId
                    email
                    firstName
                    lastName
                    profileImageUrl
                }
                }
            }
                info {
            userId
            email
            firstName
            lastName
            profileImageUrl
            }
            isDeleted
            createdAt
        }
    }

    3. Listen to real-time updates

    Response:
    {
        "data": {
            "conversationAddUser": {
            "userId": "12347",
            "conversationId": "032d0c30-a710-11e9-84d2-15bc494f8b8a",
            "conversation": {
                "id": "032d0c30-a710-11e9-84d2-15bc494f8b8a",
                "createdBy": "12345",
                "createdAt": "2019-07-15T14:51:22.610Z",
                "members": [
                {
                    "userId": "12345",
                    "info": {
                    "userId": "12345",
                    "email": "testt@hotmail.com",
                    "firstName": "Mah3e33wr767e3374442e434213l111",
                    "lastName": "Test933wwre76733336r244eeee43343219",
                    "profileImageUrl": "Test",
                    "__typename": "User"
                    },
                    "__typename": "ConversationUser"
                },
                {
                    "userId": "12346",
                    "info": {
                    "userId": "12346",
                    "email": "test@email.com",
                    "firstName": "test",
                    "lastName": "test",
                    "profileImageUrl": "Test",
                    "__typename": "User"
                    },
                    "__typename": "ConversationUser"
                },
                {
                    "userId": "12347",
                    "info": {
                    "userId": "12347",
                    "email": "testt@hotmail.com",
                    "firstName": "Mah3e33wr767e3374442e434213l111",
                    "lastName": "Test933wwre76733336r244eeee43343219",
                    "profileImageUrl": "Test",
                    "__typename": "User"
                    },
                    "__typename": "ConversationUser"
                }
                ],
                "__typename": "Conversation"
            },
            "info": {
                "userId": "12347",
                "email": "testt@hotmail.com",
                "firstName": "Mah3e33wr767e3374442e434213l111",
                "lastName": "Test933wwre76733336r244eeee43343219",
                "profileImageUrl": "Test",
                "__typename": "User"
            },
            "isDeleted": false,
            "createdAt": "2019-07-15T14:51:55.892Z",
            "__typename": "ConversationUser"
            }
        }
    }

## conversation-delete-user-subscription

    1. Subscribe
    subscription  {
        conversationDeleteUser (conversationId:  "032d0c30-a710-11e9-84d2-15bc494f8b8a"){
            userId
            conversationId
            createdAt
            info {
            userId
            email
            firstName
            lastName
            profileImageUrl
            }
        }
    }

    2. Send a conversation_delete_user mutation

    mutation ($id : ID! $userId: String!) {
        conversation_delete_user(
            id: $id
            userId: $userId
        ) {
            userId
            conversationId
            conversation{
                id
                createdBy
                createdAt
            }
            isDeleted
            createdAt
        }
    }
 
    3. Listen to real-time updates

    Response:
    {
        "data": {
            "conversationDeleteUser": {
            "userId": "12347",
            "conversationId": "032d0c30-a710-11e9-84d2-15bc494f8b8a",
            "conversation": {
                "id": "032d0c30-a710-11e9-84d2-15bc494f8b8a",
                "createdBy": "12345",
                "createdAt": "2019-07-15T14:51:22.610Z",
                "__typename": "Conversation"
            },
            "isDeleted": true,
            "createdAt": "2019-07-15T14:51:55.892Z",
            "__typename": "ConversationUser"
            }
        }
    }

## message-create-subscription

    1. Subscribe

    subscription  {
        newMessage(conversationId: "032d0c30-a710-11e9-84d2-15bc494f8b8a") {
            id
        }
    }

    2. Send a message_create mutation

    mutation ($conversationId: ID! $content: String! $contentUrl: String $createdBy: String!) {
        message_create(
            conversationId: $conversationId
            content: $content
            contentUrl : $contentUrl
            createdBy: $createdBy
        ) {
            id
            content
            contentUrl
            createdAt
            createdBy
            isDeleted
            readBy
            conversationId
        }
    }
    
 
    3. Listen to real-time updates

    Response:
    {
        "data": {
            "newMessage": {
            "id": "message:032d0c30-a710-11e9-84d2-15bc494f8b8a:2019-07-15",
            "content": "Hello World",
            "contentUrl": null,
            "createdAt": "2019-07-15T15:01:47.357Z",
            "createdBy": "12345",
            "isDeleted": false,
            "readBy": "{}",
            "conversationId": "032d0c30-a710-11e9-84d2-15bc494f8b8a",
            "__typename": "Message"
            }
        }
    }

## message-read-subscription

    1. Subscribe

    subscription  {
        readMessage(conversationId: "032d0c30-a710-11e9-84d2-15bc494f8b8a") {
            id
        }
    }

    2. Send a message_create mutation

    mutation ($id: ID! $createdAt: String! $userId: String!) {
        message_read(
            id: $id
            createdAt: $createdAt
            userId: $userId
        ) {
            id
            content
            contentUrl
            createdAt
            createdBy
            isDeleted
            readBy
            conversationId
        }
    }
    
        
 
    3. Listen to real-time updates

    Response:
    {
        "data": {
            "readMessage": {
            "id": "message:032d0c30-a710-11e9-84d2-15bc494f8b8a:2019-07-15",
            "content": "Hello World",
            "contentUrl": null,
            "createdAt": "2019-07-15T15:01:47.357Z",
            "createdBy": "12345",
            "isDeleted": false,
            "readBy": "[[\"12346\",\"2019-07-15T15:04:33.762Z\"]]",
            "conversationId": "032d0c30-a710-11e9-84d2-15bc494f8b8a",
            "__typename": "Message"
            }
        }
    }
