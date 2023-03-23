let items = require('../Items');
// 랜덤한 id를 생성함
const { v4: uuidV4 } = require('uuid');

const getItems = (request, reply)=>{
  reply.send(items);
};

const getItem = (request, reply)=>{
  const {id} = request.params;
  const item = items.find((item)=>item.id===id);
  reply.send(item);
};

const addItem = (request, reply)=>{
  const {name} = request.body;
  const item = {
    id: uuidV4(),
    name
  };

  items = [...items, item];

  reply.code(201).send(item);
}

const deleteItem = (request, reply)=>{
  const {id} = request.params;
  items = items.filter((item)=>item.id!==id);
  // 200은 default 값이므로 생략 가능
  reply.code(200).send({message: `Item ${id} has been removed!`});
};

const updateItem = (request, reply)=>{
  const {id} = request.params;
  const {name} = request.body;

  items = items.map((item)=>{
    return (item.id===id ? {id, name}:item);
  });

  item = items.find((item)=>item.id===id);
  reply.send(item);
};

module.exports = {
  getItems,
  getItem,
  addItem,
  deleteItem,
  updateItem,
}