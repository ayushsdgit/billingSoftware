package in.ayushdev.billingsoftware.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class SupabaseService {

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.key}")
    private String apiKey;

    @Autowired
    private RestTemplate restTemplate;

    public String uploadFile(MultipartFile file) throws IOException {

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        // ⚠️ bucket name check karo (images same hona chahiye)
        String url = supabaseUrl + "/storage/v1/object/images/" + fileName;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

        HttpEntity<byte[]> entity = new HttpEntity<>(file.getBytes(), headers);

        restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        // public URL return
        return supabaseUrl + "/storage/v1/object/public/images/" + fileName;
    }

//    public void deleteFile(String fileName){
//        String url = supabaseUrl + "/storage/v1/object/images/" + fileName;
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("Authorization", "Bearer" + apiKey);
//
//        HttpEntity<Void> entity = new HttpEntity<>(headers);
//
//        RestTemplate restTemplate1 = new RestTemplate();
//        restTemplate1.exchange(url, HttpMethod.DELETE, entity, String.class);
//    }
public boolean deleteFile(String fileName){

    String url = supabaseUrl + "/storage/v1/object/images/" + fileName;

    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + apiKey);

    HttpEntity<Void> entity = new HttpEntity<>(headers);

    restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);
    return true;
}


}
