package com.example.mymaps.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
public class Map {

    @Id
    @Column(name = "id")
    @Type(type = "uuid-char")
    private UUID uuid = UUID.randomUUID();
    private String title;
    private String email;

    @OneToMany(
            cascade = CascadeType.ALL,
            mappedBy = "map"
    )
    @JsonManagedReference
    private List<Point> points;
    @OneToMany(
            cascade = CascadeType.ALL,
            mappedBy = "map"
    )
    @JsonManagedReference
    private List<Polyline> polylines;
    @OneToMany(
            cascade = CascadeType.ALL,
            mappedBy = "map"
    )
    @JsonManagedReference
    private List<Polygon> polygones;
    @OneToMany(
            cascade = CascadeType.ALL,
            mappedBy = "map"
    )
    @JsonManagedReference
    private List<Rectangle> rectangles;
    @OneToMany(
            cascade = CascadeType.ALL,
            mappedBy = "map"
    )
    @JsonManagedReference
    private List<Circle> circles;



    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Point> getPoints() {
        return points;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }

    public List<Polyline> getPolylines() {
        return polylines;
    }

    public void setPolylines(List<Polyline> polylines) {
        this.polylines = polylines;
    }

    public List<Polygon> getPolygones() {
        return polygones;
    }

    public void setPolygones(List<Polygon> polygones) {
        this.polygones = polygones;
    }

    public List<Rectangle> getRectangles() {
        return rectangles;
    }

    public void setRectangles(List<Rectangle> rectangles) {
        this.rectangles = rectangles;
    }

    public List<Circle> getCircles() {
        return circles;
    }

    public void setCircles(List<Circle> circles) {
        this.circles = circles;
    }
}
