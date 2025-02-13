import { Server as  MainServer } from "./setupServer";
import express, { Express } from "express";
 
export default new MainServer(express()).getApp()
