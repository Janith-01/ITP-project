import Post from "../model/reqOrderModel.js";
import { validationResult } from 'express-validator';
import nodemailer from 'nodemailer';

/*export const create = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const reqOrderData = new Post(req.body);

        if(!reqOrderData){
            return res.status(404).json({msg:"Request Order data not found"});
        }

        const savedData = await reqOrderData.save();
        res.status(200).json(savedData);
    }catch (error){
        res.status(500).json({error:error});
    }
}*/

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'rizmiamansoor871@gmail.com',
      pass: 'nrwtqbyqaobpsvzr',
    },
  });
  
  export const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const reqOrderData = new Post(req.body);
  
      if (!reqOrderData) {
        return res.status(404).json({ msg: 'Request Order data not found' });
      }
  
      const savedData = await reqOrderData.save();
  
      // Send email notification
      const mailOptions = {
        from: 'rizmiamansoor871@gmail.com', // sender address
        to: 'rizmiamansoor99@gmail.com', // recipient email
        subject: 'New Order Request',
        text: `A new order has been requested:
          - Request ID: ${savedData.Request_ID}
          - Product Name: ${savedData.Product_Name}
          - Quantity: ${savedData.Quantity}
          - Requested Date: ${savedData.Requested_Date}
          - Status: ${savedData.Status}`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ msg: 'Order created and email sent successfully', data: savedData });
    } catch (error) {
      res.status(500).json({ error });
    }
  };
  

//fetch data
export const getAll = async (req,res)=>{
    try{
        const reqOrderData = await Post.find();
        if (!reqOrderData){
            return res.status(400).json({msg:"Request Order data not found"});
        }
        res.status(200).json(reqOrderData);
    }catch(error){

        res.status(500).json({error:error});
    }
}

//get one data
export const getOne = async (req,res)=>{
    try{
        const id = req.params.id;
        const reqOrederExist = await Post.findById(id);
        if(!reqOrederExist){
            return res.status(404).json({msg:"Request Order data not found"});
        }
        res.status(200).json(reqOrederExist);

    }catch (error){
        res.status(500).json({error:error});
    }
}

//update data
export const update = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const id =  req.params.id;
        const reqOrederExist = await Post.findById(id);
        if(!reqOrederExist){
            return res.status(401).json({msg:"Request Order data not found"});
        }

        const updatedData = await Post.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({msg:"updated Data Successfully"});
    }catch(error){
        res.status(500).json({error:error});
    }
}


//delete order
export const deleteOrder = async(req,res)=>{
    try{

        const id = req.params.id;
        const reqOrederExist = await Post.findById(id);
        if(!reqOrederExist){
            return res.status(401).json({msg:"Request Order data not found"});
        }
        await Post.findByIdAndDelete(id);
        res.status(200).json({msg:"Request Order deletet successfully"});
        
    }catch(error){
        res.status(500).json({error:error});
    }
}