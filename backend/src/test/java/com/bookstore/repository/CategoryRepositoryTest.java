package com.bookstore.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.bookstore.domain.entity.CategoryEntity;
import com.bookstore.domain.repository.CategoryRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest(properties = {
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "spring.datasource.url=jdbc:h2:mem:bookstore_test;MODE=MySQL;DB_CLOSE_DELAY=-1",
    "spring.datasource.driverClassName=org.h2.Driver",
    "spring.datasource.username=sa",
    "spring.datasource.password="
})
class CategoryRepositoryTest {

    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    void findByParentIsNullAndIsActiveTrueOrderBySortOrderAsc_shouldReturnOnlyActiveRootsSorted() {
        CategoryEntity root1 = new CategoryEntity();
        root1.setName("Root 1");
        root1.setSlug("root-1");
        root1.setSortOrder(2);
        root1.setIsActive(true);
        categoryRepository.save(root1);

        CategoryEntity root2 = new CategoryEntity();
        root2.setName("Root 2");
        root2.setSlug("root-2");
        root2.setSortOrder(1);
        root2.setIsActive(true);
        categoryRepository.save(root2);

        CategoryEntity inactiveRoot = new CategoryEntity();
        inactiveRoot.setName("Inactive Root");
        inactiveRoot.setSlug("inactive-root");
        inactiveRoot.setSortOrder(0);
        inactiveRoot.setIsActive(false);
        categoryRepository.save(inactiveRoot);

        CategoryEntity child = new CategoryEntity();
        child.setName("Child");
        child.setSlug("child");
        child.setSortOrder(0);
        child.setIsActive(true);
        child.setParent(root2);
        categoryRepository.save(child);

        List<CategoryEntity> roots = categoryRepository.findByParentIsNullAndIsActiveTrueOrderBySortOrderAsc();

        assertThat(roots).hasSize(2);
        assertThat(roots.get(0).getSlug()).isEqualTo("root-2");
        assertThat(roots.get(1).getSlug()).isEqualTo("root-1");
    }
}
