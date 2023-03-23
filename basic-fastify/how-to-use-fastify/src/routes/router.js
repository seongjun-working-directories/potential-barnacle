const items = require('../Items');

const {getItems, getItem, addItem, deleteItem, updateItem} = require('../controllers/controller');

// options for GET all items
const getItemsOptions = {
  // Data Validation
  schema: {
    response: {
      200: {
        type: 'array',
        properties: {
          // id를 주석처리하면,
          // response에 id에 해당하는 데이터가 담기지 않음
          id: {type: 'string'},
          name: {type: 'string'},
        },
      },
    },
  },
};

// item schema
const Item = {
  type: 'object',
  properties: {
    id: {type:'string'},
    name: {type:'string'},
  },
};

// options for GET single item
const getItemOptions = {
  // Data Validation
  schema: {
    response: {
      200: Item,
    },
  },

  // Handler <- controller 생성 전
  // handler: function (request, reply) {
  //   const {id} = request.params;
  //   const item = items.find(item=>item.id===id);
  //   reply.send(item);
  // },

  // Handler <- controller 생성 후
  handler: getItem,
};

// options for ADD item
const postItemOptions = {
  schema: {
    // body validation
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: {type: 'string'},
      },
    },
    response: {
      201: Item,
    },
  },
  handler: addItem,
};

// options for DELETE item
const deleteItemOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: {type: 'string'},
        },
      },
    },
  },
  handler: deleteItem,
};

// options for UPDATE item
const updateItemOptions = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: updateItem,
}

// 라우터들이 여기 들어감
function itemRoutes(fastify, options, done) {

  // GET all items
  fastify.get('/items', getItemsOptions, (request, reply)=>{
    reply.send(items);
  });
  
  // GET single item
  fastify.get('/items/:id', getItemOptions);

  // ADD item
  fastify.post('/items', postItemOptions);

  // DELETE item
  fastify.delete('/items/:id', deleteItemOptions);

  // UPDATE item
  fastify.put('/items/:id', updateItemOptions);
  
  done();
}

module.exports = itemRoutes;