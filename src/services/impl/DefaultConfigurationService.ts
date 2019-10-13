import { ConfigurationService } from "../ConfigurationService";
import { Configuration } from "../../model/Configuration";

export class DefaultConfgurationService implements ConfigurationService {
    
    private config : Configuration;

    constructor() {
        this.config = new Configuration();
    }
    
    getConfiguration() {
        return this.config;
    }
}