const {User, Thought} = require('../models');

const userController = {
   getAllUsers(req, res){
        User.find({})
        .populate({
          path: 'thoughts',
          select: '-__v'})
          .select('-__v')
          .sort({ _id: -1 })
          .populate({
            path: 'reactions',
            select: '-__v'})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
  getUserById({params}, res){
      User.findOne({_id:params.id})
      .populate({
        path: 'thoughts',
        select: '-__v'})
        .select('-__v')
        .then(dbUserData => {
            // If no pizza is found, send 404
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
      createUser({body}, res){
          User.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.status(400).json(err));
      },
      updateUser({params, body}, res){
          User.findOneAndUpdate({_id: params.id},body, {new:true})
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
      },
      deleteUser({params}, res){User.findOneAndDelete(
                  {_id: params.id}
                 
          
      )
          .then(dbUserData => {
              if(!dbUserData){
                  res.status(404).json({ message: 'no user found with that id!'})
                  return
                }
           //userId is the user who created this thougt
           //all thoughts share this
                return Thought.deleteMany({ userId: params.id})
               
              .then(dbThoughtData => {
                if (!dbThoughtData) {
                  res.status(404).json({ message: 'No id found with this id!' });
                  return;
                }
                res.json(dbUserData);
              })
              .catch(err => res.status(400).json(err));
})},
        addFriend({params}, res){
          User.findOneAndUpdate(
            {_id:params.userId},
            {$push:{friends: params.friendId}},
            {new: true}
          ).then(dbUserData => {
            if(!dbUserData){
              res.status(404).json({ message: 'No id found with this id!' });
              return;
            }
            res.json(dbUserData);
          }).catch(err => res.json(err));
        },
        removeFriend({params}, res){
          User.findOneAndUpdate(
            {_id:params.userId},
            {$pull:{friends: params.friendId}},
            {new: true}
          ).then(dbUserData => {
            if(!dbUserData){
              res.status(404).json({ message: 'No id found with this id!' });
              return;
            }
            res.json(dbUserData);
          }).catch(err => res.json(err));
        },
}
module.exports = userController;