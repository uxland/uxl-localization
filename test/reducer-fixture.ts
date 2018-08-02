import {reducer} from "../src/reducer";

const assert = chai.assert;
suite('reducer fixture', () =>{
   test('include formats, language and locales', () =>{
       const state = reducer(<any>{}, {type: '@@init'});
       assert.containsAllKeys(state, ['formats', 'language', 'locales']);
   }) ;

});