package ru.ddc.bootifyexample.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.ddc.bootifyexample.domain.Item;


public interface ItemRepository extends JpaRepository<Item, Long> {
}
