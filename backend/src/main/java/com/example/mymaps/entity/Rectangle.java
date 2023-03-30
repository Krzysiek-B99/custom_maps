package com.example.mymaps.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.List;

@Entity
public class Rectangle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private String description;
    private String picture;
    @ElementCollection
    private List<Double> northEast;
    @ElementCollection
    private List<Double> southWest;
    @ManyToOne
    @JsonBackReference
    private Map map;

    public Map getMap() {
        return map;
    }

    public void setMap(Map map) {
        this.map = map;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public List<Double> getNorthEast() {
        return northEast;
    }

    public void setNorthEast(List<Double> northEast) {
        this.northEast = northEast;
    }

    public List<Double> getSouthWest() {
        return southWest;
    }

    public void setSouthWest(List<Double> southWest) {
        this.southWest = southWest;
    }
}
