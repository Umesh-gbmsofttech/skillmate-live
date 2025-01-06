package app.jwt;

import com.fasterxml.jackson.annotation.JsonView;

import app.entity.JsonResoponse_View;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
	@JsonView(JsonResoponse_View.BasicView.class)
    private String token;
	@JsonView(JsonResoponse_View.BasicView.class)
    private Object userData; // Can be Trainer, Student, or any user details
}


//package app.jwt;
//
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Data
//@Builder
//public class JwtResponse {
//    private String token;
//
//    public JwtResponse(String token) {
//        this.token = token;
//    }
//
//    public String getToken() {
//        return token;
//    }
//
//    public void setToken(String token) {
//        this.token = token;
//    }
//}