const {thought, user} = require("../models");

const thoughtController = {

    getAllThoughts(req, res) {
        thought.find({})
        .select('-__v')
        .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
    },

    createThought ({ body }, res) {
    thought.create(body)
.then ((thoughtData) => 
    
    user.findOneAndUpdate(
        {_id: body.userId},
        {$addToSet: {thoughts: thoughtData._id}},
        {new: true, runValidators: true})
        .populate([{
          path: 'thoughts',
          select: '-__v'
        }, 
        {
          path: 'friends',
          select: '-__v'
        }
      ])
        .select('-__v')
        .then((userData) => res.json({thoughtData, userData}))
)
    .catch((err) =>{ 
        console.error(err);
        res.status(400).json(err)
        
    });
},

    getOneThought({ params }, res) {
        thought.findOne({ id: params._id })
        .select('-__v')
          .then((thoughtData) => {
            if (!thoughtData) {
              res.status(404).json({ message: "There is no thought with this id!" });
              return;
            }
            res.json(thoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      },

      updateThought({ params, body }, res) {
        thought.findOneAndUpdate({ id: params._id }, body, {
          new: true,
          runValidators: true,
        })
        .select('-__v')
        .then(thoughtData => {
            if (!thoughtData) {
              res.status(404).json({ message: 'There is no thought with this id!' });
              return;
            }
            res.json(thoughtData);
          })
          .catch(err => res.status(400).json(err));
      },

      deleteThought({ params }, res) {
        thought.findByIdAndDelete({ _id: params.thoughtId })
        .then(thoughtData => {
          if (!thoughtData) {
            res.status(404).json({ message: 'There is no thought with this id!' });
            return;
          }
          res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
    },


}

module.exports = thoughtController;