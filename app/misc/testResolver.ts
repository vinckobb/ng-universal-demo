import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export class TestResolver implements Resolve<any> {
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log(route.params);
    }
}