package com.example.mymaps.controller;

import com.example.mymaps.service.MapService;
import com.example.mymaps.entity.Map;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin
@RestController
public class MapController {

    private final MapService mapService;
    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/map")
    public List<Map> getAllMaps(){
        return mapService.getAllMaps();
    }
    @PostMapping("/map")
    public void postMapById( @RequestBody Map map) throws MessagingException {
        mapService.saveMap(map);
    }
    @GetMapping("/map/{uuid}")
    public Optional<Map> getMapById(@PathVariable UUID uuid ){
        return mapService.getMapByUuid(uuid);
    }

 //   @DeleteMapping("/map/{id}")
//    public void deleteMapById(@PathVariable long id){
//        mapRepo.deleteById(id);
//    }
//    @PutMapping("/map/{id}")
//    public void updateMapById(@PathVariable long id,@RequestBody Map map){
//
//        Map oldMap = mapRepo.findById(id);
//        oldMap.setTitle(map.getTitle());
//        oldMap.setPoints(map.getPoints());
//        mapRepo.save(oldMap);
//        //funkcja ktora bedzie usuwac stare pointy.
//    }
}
