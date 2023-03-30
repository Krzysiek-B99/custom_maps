package com.example.mymaps.service;

import com.example.mymaps.entity.Map;
import com.example.mymaps.repository.MapRepo;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MapService {

    private final MapRepo mapRepo;
    private final MailService mailService;
    
    public MapService(MapRepo mapRepo, MailService mailService) {
        this.mapRepo = mapRepo;
        this.mailService = mailService;
    }
    public List<Map> getAllMaps(){
        return mapRepo.findAll();
    }
    public void saveMap(Map map) throws MessagingException {
        mapRepo.save(map);
        mailService.sendMail(map.getEmail(),"Your map's indentifier",map.getUuid().toString());
    }
    public Optional<Map> getMapByUuid(UUID uuid){
        return mapRepo.findById(uuid);
    }
}
