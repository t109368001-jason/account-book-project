package com.github.jason.accountbook.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.FileTime;
import java.util.Comparator;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@SuppressWarnings("ALL")
@Service
@Slf4j
public class LogFileService {
  
  public final Path logFileFolder = Paths.get("./logs");
  
  public LogFileService() {
    log.info("new instance={}", this);
  }
  
  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class LogFile {
    private String name;
    private String size;
    private FileTime lastModified;
    private String path;
  }
  
  public Set<LogFile> info(String filter) {
    log.debug("info() start, filter={}", filter);
    final Set<LogFile> logFileList;
    try {
      Stream<Path> fileStream = Files.list(logFileFolder);
      if (StringUtils.isNotBlank(filter)) {
        fileStream = fileStream.filter(p -> StringUtils.containsIgnoreCase(p.toString(), filter));
      }
      logFileList = fileStream.map(a -> toLogFileVo(a))
                              .sorted(Comparator.comparing(LogFile::getName))
                              .collect(Collectors.toSet());
    } catch (IOException e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "cannot open file");
    }
    log.debug("info() end, logFileList={}", logFileList);
    return logFileList;
  }
  
  public FileSystemResource download(String fileName) {
    log.debug("download() start, fileName={}", fileName);
    final FileSystemResource resource = new FileSystemResource(logFileFolder.resolve(fileName));
    log.debug("download() end, resource={}", resource);
    return resource;
  }
  
  public void delete(String fileName) {
    log.debug("delete() start, fileName={}", fileName);
    try {
      Files.delete(logFileFolder.resolve(fileName));
    } catch (IOException e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "cannot open file");
    }
    log.debug("delete() end");
  }
  
  String humanReadableByteCount(long bytes, boolean si) {
    int unit = si ? 1000 : 1024;
    if (bytes < unit) {
      return bytes + " B";
    }
    int exp = (int) (Math.log(bytes) / Math.log(unit));
    String pre = (si ? "kMGTPE" : "KMGTPE").charAt(exp - 1) + (si ? "" : "i");
    return String.format("%.1f %sB", bytes / Math.pow(unit, exp), pre);
  }
  
  private LogFile toLogFileVo(Path file) {
    final long size;
    final FileTime lastModifiedTime;
    try {
      size = Files.size(file);
      lastModifiedTime = Files.getLastModifiedTime(file);
    } catch (IOException e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "cannot open file");
    }
    return LogFile.builder()
                  .name(file.getFileName()
                            .toString())
                  .size(humanReadableByteCount(size, true))
                  .lastModified(lastModifiedTime)
                  .path(file.toString())
                  .build();
  }
  
  /**
   * check file > 10MB can't view online
   */
  public boolean checkCanViewOnline(String fileName) {
    final Path file = logFileFolder.resolve(fileName);
    if (!Files.exists(file)) {
      return false;
    }
    try {
      if (Files.size(file) > 10485760L) {
        return false;
      }
    } catch (IOException e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "cannot open file");
    }
    return true;
  }
  
  public static byte[] zipBytes(String fileName, byte[] input) {
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    ZipOutputStream zos = new ZipOutputStream(baos);
    ZipEntry entry = new ZipEntry(fileName);
    entry.setSize(input.length);
    try {
      zos.putNextEntry(entry);
      zos.write(input);
      zos.closeEntry();
      zos.close();
    } catch (IOException e) {
      log.error("to zip {} error: {}", fileName, ExceptionUtils.getMessage(e));
    }
    return baos.toByteArray();
  }
  
}
